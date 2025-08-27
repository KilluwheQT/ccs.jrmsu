<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900">
          {{ isLogin ? 'Sign in to your account' : 'Create your account' }}
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
          <button 
            @click="toggleMode" 
            class="font-medium text-primary-600 hover:text-primary-500"
          >
            {{ isLogin ? 'Sign up' : 'Sign in' }}
          </button>
        </p>
      </div>

      <div class="card">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div v-if="!isLogin">
            <label for="name" class="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="input-field mt-1"
              placeholder="Enter your full name"
            />
          </div>

          <div v-if="!isLogin">
            <label for="course" class="block text-sm font-medium text-gray-700">
              Course
            </label>
            <select
              id="course"
              v-model="form.course"
              required
              class="input-field mt-1"
            >
              <option value="">Select your course</option>
              <option value="BSCS">BSCS - Bachelor of Science in Computer Science</option>
              <option value="BSIT">BSIT - Bachelor of Science in Information Technology</option>
              <option value="BSIS">BSIS - Bachelor of Science in Information Systems</option>
              <option value="MSIT">MSIT - Master of Science in Information Technology</option>
            </select>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="input-field mt-1"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="input-field mt-1"
              placeholder="Enter your password"
              :minlength="isLogin ? 6 : 6"
            />
          </div>

          <div v-if="!isLogin">
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              required
              class="input-field mt-1"
              placeholder="Confirm your password"
              minlength="6"
            />
          </div>

          <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {{ error }}
          </div>

          <div v-if="success" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {{ success }}
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full btn-primary py-3 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
            <span v-else>
              {{ isLogin ? 'Sign in' : 'Sign up' }}
            </span>
          </button>
        </form>
      </div>

      <div class="text-center">
        <router-link 
          to="/" 
          class="text-sm text-gray-600 hover:text-primary-600"
        >
          ← Back to Home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const isLogin = ref(true)
const loading = ref(false)
const error = ref('')
const success = ref('')

const form = reactive({
  name: '',
  course: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const toggleMode = () => {
  isLogin.value = !isLogin.value
  error.value = ''
  success.value = ''
  // Clear form
  Object.keys(form).forEach(key => {
    form[key] = ''
  })
}

const handleSubmit = async () => {
  error.value = ''
  success.value = ''
  loading.value = true

  try {
    if (!isLogin.value && form.password !== form.confirmPassword) {
      error.value = 'Passwords do not match'
      return
    }

    if (!isLogin.value && form.password.length < 6) {
      error.value = 'Password must be at least 6 characters long'
      return
    }

    if (!isLogin.value && !form.course) {
      error.value = 'Please select your course'
      return
    }

    let result
    if (isLogin.value) {
      result = await authStore.login(form.email, form.password)
    } else {
      result = await authStore.register(form.email, form.password, form.name, form.course)
    }

    if (result.success) {
      if (isLogin.value) {
        success.value = 'Successfully signed in!'
        setTimeout(() => {
          router.push('/forum')
        }, 1000)
      } else {
        success.value = result.message || 'Account created successfully! Please wait for admin approval.'
        // Don't redirect for registration - user needs to wait for approval
      }
    } else {
      error.value = result.error
    }
  } catch (err) {
    error.value = 'An unexpected error occurred. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
