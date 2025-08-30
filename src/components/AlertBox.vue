<template>
  <Teleport to="body">
    <Transition name="alert">
      <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div 
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          @click="handleBackdropClick"
        ></div>
        
        <!-- Alert Box -->
        <div class="relative bg-gray-900 border border-gray-700 rounded-xl shadow-2xl max-w-md w-full mx-4">
          <!-- Header -->
          <div class="flex items-center gap-3 p-6 border-b border-gray-700">
            <!-- Icon -->
            <div class="flex-shrink-0">
              <svg 
                v-if="type === 'success'" 
                class="w-6 h-6 text-green-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <svg 
                v-else-if="type === 'error'" 
                class="w-6 h-6 text-red-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <svg 
                v-else-if="type === 'warning'" 
                class="w-6 h-6 text-yellow-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <svg 
                v-else 
                class="w-6 h-6 text-blue-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <!-- Title -->
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-100">
                {{ title }}
              </h3>
            </div>
            
            <!-- Close Button -->
            <button 
              @click="close"
              class="flex-shrink-0 p-1 text-gray-400 hover:text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <!-- Content -->
          <div class="p-6">
            <p class="text-gray-300 leading-relaxed">
              {{ message }}
            </p>
          </div>
          
          <!-- Actions -->
          <div class="flex gap-3 p-6 pt-0">
            <button 
              v-if="showCancel"
              @click="handleCancel"
              class="flex-1 px-4 py-2 text-gray-300 bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-gray-500 rounded-lg font-medium transition-colors"
            >
              {{ cancelText }}
            </button>
            <button 
              @click="handleConfirm"
              :class="[
                'flex-1 px-4 py-2 rounded-lg font-medium transition-colors',
                type === 'success' ? 'bg-green-600 hover:bg-green-700 text-white' :
                type === 'error' ? 'bg-red-600 hover:bg-red-700 text-white' :
                type === 'warning' ? 'bg-yellow-600 hover:bg-yellow-700 text-white' :
                'bg-blue-600 hover:bg-blue-700 text-white'
              ]"
            >
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
  },
  title: {
    type: String,
    default: 'Alert'
  },
  message: {
    type: String,
    required: true
  },
  confirmText: {
    type: String,
    default: 'OK'
  },
  cancelText: {
    type: String,
    default: 'Cancel'
  },
  showCancel: {
    type: Boolean,
    default: false
  },
  autoClose: {
    type: Boolean,
    default: false
  },
  autoCloseDelay: {
    type: Number,
    default: 3000
  }
})

const emit = defineEmits(['confirm', 'cancel', 'close'])

const isVisible = ref(false)
let autoCloseTimer = null

onMounted(() => {
  isVisible.value = true
  
  if (props.autoClose) {
    autoCloseTimer = setTimeout(() => {
      close()
    }, props.autoCloseDelay)
  }
})

const close = () => {
  isVisible.value = false
  if (autoCloseTimer) {
    clearTimeout(autoCloseTimer)
  }
  emit('close')
}

const handleConfirm = () => {
  emit('confirm')
  close()
}

const handleCancel = () => {
  emit('cancel')
  close()
}

const handleBackdropClick = () => {
  if (props.showCancel) {
    handleCancel()
  } else {
    close()
  }
}
</script>

<style scoped>
.alert-enter-active,
.alert-leave-active {
  transition: all 0.3s ease;
}

.alert-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.alert-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
