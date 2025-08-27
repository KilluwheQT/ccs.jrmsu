<template>
  <div class="card">
    <div class="text-center">
      <svg class="w-16 h-16 mx-auto text-yellow-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">Admin Account Setup</h3>
      <p class="text-gray-600 mb-4">
        Your admin account needs to be approved. Click the button below to approve yourself as an admin.
      </p>
      <button 
        @click="approveSelf"
        :disabled="approving"
        class="btn-primary"
      >
        <span v-if="approving">Approving...</span>
        <span v-else>Approve as Admin</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const approving = ref(false)

const approveSelf = async () => {
  approving.value = true
  try {
    const result = await authStore.approveCurrentUser()
    if (result.success) {
      alert('Successfully approved as admin! You can now access the admin dashboard.')
      window.location.reload()
    } else {
      alert('Error approving account: ' + result.error)
    }
  } catch (error) {
    console.error('Error:', error)
    alert('Error approving account')
  } finally {
    approving.value = false
  }
}
</script>
