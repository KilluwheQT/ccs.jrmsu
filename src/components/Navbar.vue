<template>
  <nav class="bg-gray-800/50 backdrop-blur-sm border-b border-purple-500/20 shadow-xl">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <router-link to="/" class="flex-shrink-0 flex items-center">
            <img :src="ccsLogo" alt="JRMSU College of Computing Studies Logo" class="w-12 h-12 object-contain" />
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link 
            to="/" 
            class="text-gray-300 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-purple-400"
          >
            Home
          </router-link>
          <router-link 
            to="/forum" 
            class="text-gray-300 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-purple-400"
          >
            Forum
          </router-link>
          <router-link 
            to="/about" 
            class="text-gray-300 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-purple-400"
          >
            About
          </router-link>
          <router-link 
            to="/faculty" 
            class="text-gray-300 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-purple-400"
          >
            Faculty
          </router-link>
          <router-link 
            to="/hall-of-fame" 
            class="text-gray-300 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-purple-400"
          >
            Hall of Fame
          </router-link>
          <router-link 
            to="/events" 
            class="text-gray-300 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-purple-400"
          >
            Events
          </router-link>
          <router-link 
            v-if="authStore.isAdmin"
            to="/admin" 
            class="text-purple-400 hover:text-purple-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-purple-300"
          >
            Admin Dashboard
          </router-link>
        </div>

        <!-- Auth Section -->
        <div class="flex items-center space-x-4">
          <div v-if="authStore.loading" class="text-gray-400">
            Loading...
          </div>
          <div v-else-if="authStore.isAuthenticated" class="flex items-center space-x-4">
            <div class="text-right">
              <div class="text-sm text-gray-300">{{ authStore.userProfile?.name || authStore.user.email }}</div>
              <div v-if="authStore.userProfile?.course" class="text-xs text-gray-400">{{ authStore.userProfile.course }}</div>
            </div>
            <button 
              @click="handleLogout" 
              class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm"
            >
              Logout
            </button>
          </div>
          <div v-else>
            <router-link 
              to="/login" 
              class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm"
            >
              Login
            </router-link>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="text-gray-300 hover:text-purple-400 p-2"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="mobileMenuOpen" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-purple-500/20">
          <router-link 
            to="/" 
            class="text-gray-300 hover:text-purple-400 block px-3 py-2 rounded-md text-base font-medium"
            active-class="text-purple-400"
            @click="mobileMenuOpen = false"
          >
            Home
          </router-link>
          <router-link 
            to="/forum" 
            class="text-gray-300 hover:text-purple-400 block px-3 py-2 rounded-md text-base font-medium"
            active-class="text-purple-400"
            @click="mobileMenuOpen = false"
          >
            Forum
          </router-link>
          <router-link 
            to="/about" 
            class="text-gray-700 hover:text-purple-400 block px-3 py-2 rounded-md text-base font-medium"
            active-class="text-purple-400"
            @click="mobileMenuOpen = false"
          >
            About
          </router-link>
          <router-link 
            to="/faculty" 
            class="text-gray-300 hover:text-purple-400 block px-3 py-2 rounded-md text-base font-medium"
            active-class="text-purple-400"
            @click="mobileMenuOpen = false"
          >
            Faculty
          </router-link>
          <router-link 
            to="/hall-of-fame" 
            class="text-gray-300 hover:text-purple-400 block px-3 py-2 rounded-md text-base font-medium"
            active-class="text-purple-400"
            @click="mobileMenuOpen = false"
          >
            Hall of Fame
          </router-link>
          <router-link 
            to="/events" 
            class="text-gray-300 hover:text-purple-400 block px-3 py-2 rounded-md text-base font-medium"
            active-class="text-purple-400"
            @click="mobileMenuOpen = false"
          >
            Events
          </router-link>
          <router-link 
            v-if="authStore.isAdmin"
            to="/admin" 
            class="text-purple-400 hover:text-purple-300 block px-3 py-2 rounded-md text-base font-medium"
            active-class="text-purple-300"
            @click="mobileMenuOpen = false"
          >
            Admin Dashboard
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import ccsLogo from '../assets/img/ccs.svg'

const router = useRouter()
const authStore = useAuthStore()
const mobileMenuOpen = ref(false)

const handleLogout = async () => {
  const result = await authStore.logout()
  if (result.success) {
    router.push('/login')
  }
}
</script>
