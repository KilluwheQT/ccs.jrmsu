<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-3xl font-bold text-purple-300">Admin Dashboard</h1>
                  <p class="text-gray-300 mt-2">Manage users, approve registrations, and oversee the forum</p>
      </div>
      <div class="flex gap-2">
        <button 
          @click="showCreateAdmin = !showCreateAdmin"
          class="btn-primary"
        >
          {{ showCreateAdmin ? 'Cancel' : 'Create Admin' }}
        </button>
        <button 
          @click="refreshData"
          class="btn-secondary"
        >
          Refresh
        </button>
      </div>
    </div>

    <!-- Create Admin Form -->
    <div v-if="showCreateAdmin" class="card">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Create New Admin Account</h3>
      <form @submit.prevent="handleCreateAdmin" class="space-y-4">
        <div>
          <label for="adminName" class="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            id="adminName"
            v-model="adminForm.name"
            type="text"
            required
            class="input-field"
            placeholder="Enter admin full name"
          />
        </div>
        <div>
          <label for="adminEmail" class="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="adminEmail"
            v-model="adminForm.email"
            type="email"
            required
            class="input-field"
            placeholder="Enter admin email"
          />
        </div>
        <div>
          <label for="adminPassword" class="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="adminPassword"
            v-model="adminForm.password"
            type="password"
            required
            class="input-field"
            placeholder="Enter admin password"
            minlength="6"
          />
        </div>
        <div class="flex justify-end gap-2">
          <button 
            type="button" 
            @click="showCreateAdmin = false"
            class="btn-secondary"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            :disabled="creatingAdmin"
            class="btn-primary"
          >
            <span v-if="creatingAdmin">Creating...</span>
            <span v-else>Create Admin</span>
          </button>
        </div>
      </form>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="card">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Total Users</p>
            <p class="text-2xl font-semibold text-gray-900">{{ authStore.allUsers.length }}</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="h-8 w-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Pending Approval</p>
            <p class="text-2xl font-semibold text-gray-900">{{ authStore.pendingUsers.length }}</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Approved Users</p>
            <p class="text-2xl font-semibold text-gray-900">{{ approvedUsersCount }}</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Admins</p>
            <p class="text-2xl font-semibold text-gray-900">{{ adminCount }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Pending Users Section -->
    <div class="card">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-semibold text-gray-900">Pending User Approvals</h3>
        <span class="text-sm text-gray-500">{{ authStore.pendingUsers.length }} users waiting</span>
      </div>

      <div v-if="authStore.pendingUsers.length === 0" class="text-center py-8">
        <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-gray-600">No pending approvals</p>
      </div>

      <div v-else class="space-y-4">
        <div 
          v-for="user in authStore.pendingUsers" 
          :key="user.id"
          class="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors"
        >
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h4 class="font-medium text-gray-900 text-lg">{{ user.name }}</h4>
                <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  {{ user.course }}
                </span>
              </div>
              <p class="text-sm text-gray-600 mb-2">{{ user.email }}</p>
              <p class="text-xs text-gray-400">Registered: {{ formatDate(user.createdAt) }}</p>
            </div>
            <div class="flex gap-2">
              <button 
                @click="approveUser(user.id)"
                class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Approve
              </button>
              <button 
                @click="rejectUser(user.id)"
                class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- All Users Section -->
    <div class="card">
      <h3 class="text-lg font-semibold text-gray-900 mb-6">All Users</h3>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in authStore.allUsers" :key="user.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                  <div class="text-sm text-gray-500">{{ user.email }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ user.course }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  :class="user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                >
                  {{ user.role }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  :class="user.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                >
                  {{ user.approved ? 'Approved' : 'Pending' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex gap-2">
                  <select 
                    v-if="user.role !== 'admin'"
                    :value="user.role"
                    @change="updateUserRole(user.id, $event.target.value)"
                    class="text-sm border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button 
                    @click="deleteUser(user.id)"
                    class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                  >
                    <svg class="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

const showCreateAdmin = ref(false)
const creatingAdmin = ref(false)

const adminForm = reactive({
  name: '',
  email: '',
  password: ''
})

const approvedUsersCount = computed(() => {
  return authStore.allUsers.filter(user => user.approved).length
})

const adminCount = computed(() => {
  return authStore.allUsers.filter(user => user.role === 'admin').length
})

onMounted(async () => {
  await refreshData()
})

const refreshData = async () => {
  await Promise.all([
    authStore.fetchPendingUsers(),
    authStore.fetchAllUsers()
  ])
}

const handleCreateAdmin = async () => {
  if (!adminForm.name.trim() || !adminForm.email.trim() || !adminForm.password.trim()) return
  
  creatingAdmin.value = true
  try {
    const result = await authStore.createAdminAccount(
      adminForm.email,
      adminForm.password,
      adminForm.name
    )
    
    if (result.success) {
      adminForm.name = ''
      adminForm.email = ''
      adminForm.password = ''
      showCreateAdmin.value = false
      await refreshData()
      alert('Admin account created successfully!')
    } else {
      alert('Error creating admin account: ' + result.error)
    }
  } catch (error) {
    console.error('Error creating admin:', error)
    alert('Error creating admin account')
  } finally {
    creatingAdmin.value = false
  }
}

const approveUser = async (userId) => {
  if (confirm('Are you sure you want to approve this user?')) {
    const result = await authStore.approveUser(userId)
    if (result.success) {
      alert('User approved successfully!')
    } else {
      alert('Error approving user: ' + result.error)
    }
  }
}

const rejectUser = async (userId) => {
  if (confirm('Are you sure you want to reject this user? This action cannot be undone.')) {
    const result = await authStore.rejectUser(userId)
    if (result.success) {
      alert('User rejected successfully!')
    } else {
      alert('Error rejecting user: ' + result.error)
    }
  }
}

const updateUserRole = async (userId, role) => {
  const result = await authStore.updateUserRole(userId, role)
  if (result.success) {
    alert('User role updated successfully!')
  } else {
    alert('Error updating user role: ' + result.error)
  }
}

const deleteUser = async (userId) => {
  if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
    const result = await authStore.deleteUser(userId)
    if (result.success) {
      alert('User deleted successfully!')
    } else {
      alert('Error deleting user: ' + result.error)
    }
  }
}

const formatDate = (timestamp) => {
  if (!timestamp) return 'Unknown'
  
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
}
</script>
