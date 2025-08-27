<template>
  <nav class="bg-white shadow-lg border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <router-link to="/" class="flex-shrink-0 flex items-center">
            <h1 class="text-2xl font-bold text-primary-600">CCS Forum</h1>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link 
            to="/" 
            class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-primary-600"
          >
            Home
          </router-link>
          <router-link 
            to="/forum" 
            class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-primary-600"
          >
            Forum
          </router-link>
          <router-link 
            to="/about" 
            class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-primary-600"
          >
            About
          </router-link>
          <router-link 
            to="/faculty" 
            class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-primary-600"
          >
            Faculty
          </router-link>
          <router-link 
            to="/hall-of-fame" 
            class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-primary-600"
          >
            Hall of Fame
          </router-link>
          <router-link 
            to="/events" 
            class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-primary-600"
          >
            Events
          </router-link>
          <router-link 
            v-if="authStore.isAdmin"
            to="/admin" 
            class="text-red-600 hover:text-red-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-red-700"
          >
            Admin Dashboard
          </router-link>
        </div>

        <!-- Auth Section -->
        <div class="flex items-center space-x-4">
          <div v-if="authStore.loading" class="text-gray-500">
            Loading...
          </div>
          <div v-else-if="authStore.isAuthenticated" class="flex items-center space-x-4">
            <div class="text-right">
              <div class="text-sm text-gray-700">{{ authStore.userProfile?.name || authStore.user.email }}</div>
              <div v-if="authStore.userProfile?.course" class="text-xs text-gray-500">{{ authStore.userProfile.course }}</div>
            </div>
            <button 
              @click="handleLogout" 
              class="btn-secondary text-sm"
            >
              Logout
            </button>
          </div>
          <div v-else>
            <router-link 
              to="/login" 
              class="btn-primary text-sm"
            >
              Login
            </router-link>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="text-gray-700 hover:text-primary-600 p-2"
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
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
          <router-link 
            to="/" 
            class="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
            active-class="text-primary-600"
            @click="mobileMenuOpen = false"
          >
            Home
          </router-link>
          <router-link 
            to="/forum" 
            class="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
            active-class="text-primary-600"
            @click="mobileMenuOpen = false"
          >
            Forum
          </router-link>
          <router-link 
            to="/about" 
            class="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
            active-class="text-primary-600"
            @click="mobileMenuOpen = false"
          >
            About
          </router-link>
          <router-link 
            to="/faculty" 
            class="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
            active-class="text-primary-600"
            @click="mobileMenuOpen = false"
          >
            Faculty
          </router-link>
          <router-link 
            to="/hall-of-fame" 
            class="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
            active-class="text-primary-600"
            @click="mobileMenuOpen = false"
          >
            Hall of Fame
          </router-link>
          <router-link 
            to="/events" 
            class="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
            active-class="text-primary-600"
            @click="mobileMenuOpen = false"
          >
            Events
          </router-link>
          <router-link 
            v-if="authStore.isAdmin"
            to="/admin" 
            class="text-red-600 hover:text-red-700 block px-3 py-2 rounded-md text-base font-medium"
            active-class="text-red-700"
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
