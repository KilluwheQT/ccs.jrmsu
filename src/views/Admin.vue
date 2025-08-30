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
          class="btn-primary flex items-center"
        >
          <svg v-if="!showCreateAdmin" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          {{ showCreateAdmin ? 'Cancel' : 'Create Admin' }}
        </button>
        <button 
          @click="refreshData"
          class="btn-secondary flex items-center"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>
    </div>

    <!-- Create Admin Form -->
    <div v-if="showCreateAdmin" class="card">
      <h3 class="text-lg font-semibold text-purple-300 mb-4">Create New Admin Account</h3>
      <form @submit.prevent="handleCreateAdmin" class="space-y-4">
        <div>
          <label for="adminName" class="block text-sm font-medium text-gray-300 mb-1">
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
          <label for="adminEmail" class="block text-sm font-medium text-gray-300 mb-1">
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
          <label for="adminPassword" class="block text-sm font-medium text-gray-300 mb-1">
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
            class="btn-secondary flex items-center"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cancel
          </button>
          <button 
            type="submit" 
            :disabled="creatingAdmin"
            class="btn-primary flex items-center"
          >
            <svg v-if="!creatingAdmin" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <svg v-else class="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
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
            <svg class="h-8 w-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-400">Total Users</p>
            <p class="text-2xl font-semibold text-purple-300">{{ authStore.allUsers.length }}</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="h-8 w-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-400">Pending Approval</p>
            <p class="text-2xl font-semibold text-yellow-300">{{ authStore.pendingUsers.length }}</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="h-8 w-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-400">Approved Users</p>
            <p class="text-2xl font-semibold text-green-300">{{ approvedUsersCount }}</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="h-8 w-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-400">Admins</p>
            <p class="text-2xl font-semibold text-red-300">{{ adminCount }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- User Status Management Info -->
    <div class="bg-purple-900/30 border border-purple-500/30 rounded-lg p-4 mb-6">
      <div class="flex items-start">
        <svg class="w-5 h-5 text-purple-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.5 0a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <div>
          <h4 class="text-sm font-medium text-purple-300">User Status Management</h4>
          <p class="text-sm text-gray-300 mt-1">
            Users must have their status approved before they can log in to the system. 
            Use "Approve Status" to allow users to access the system, or "Reject Status" to prevent access.
          </p>
        </div>
      </div>
    </div>

    <!-- Pending Users Section -->
    <div class="card">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-semibold text-purple-300">Pending User Approvals</h3>
        <span class="text-sm text-gray-400">{{ authStore.pendingUsers.length }} users waiting</span>
      </div>

      <div v-if="authStore.pendingUsers.length === 0" class="text-center py-8">
        <svg class="w-16 h-16 mx-auto text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <p class="text-gray-400">No pending approvals</p>
      </div>

      <div v-else class="space-y-4">
        <div 
          v-for="user in authStore.pendingUsers" 
          :key="user.id"
          class="border border-purple-500/20 rounded-lg p-6 hover:bg-purple-900/20 transition-colors"
        >
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h4 class="font-medium text-purple-300 text-lg">{{ user.name }}</h4>
                <span class="px-2 py-1 bg-purple-900/50 text-purple-300 text-xs font-medium rounded-full border border-purple-500/30">
                  {{ user.course }}
                </span>
              </div>
              <p class="text-sm text-gray-300 mb-2">{{ user.email }}</p>
              <p class="text-xs text-gray-500">Registered: {{ formatDate(user.createdAt) }}</p>
            </div>
            <div class="flex flex-col gap-2">
              <button 
                @click="approveUserStatus(user.id)"
                class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
              >
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Approve Status
              </button>
              <button 
                @click="rejectUser(user.id)"
                class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
              >
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete User
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- All Users Section -->
    <div class="card">
      <h3 class="text-lg font-semibold text-purple-300 mb-6">All Users</h3>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-purple-500/20">
          <thead class="bg-purple-900/20">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                User
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                Course
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                Role
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-purple-500/20">
            <tr v-for="user in authStore.allUsers" :key="user.id" class="hover:bg-purple-900/20 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-purple-300">{{ user.name }}</div>
                  <div class="text-sm text-gray-400">{{ user.email }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {{ user.course }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  :class="user.role === 'admin' ? 'bg-red-900/50 text-red-300 border-red-500/30' : 'bg-blue-900/50 text-blue-300 border-blue-500/30'"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full border"
                >
                  {{ user.role }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  :class="user.approved ? 'bg-green-900/50 text-green-300 border-green-500/30' : 'bg-yellow-900/50 text-yellow-300 border-yellow-500/30'"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full border"
                >
                  {{ user.approved ? 'Approved' : 'Pending' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex flex-col gap-2">
                  <select 
                    v-if="user.role !== 'admin'"
                    :value="user.role"
                    @change="updateUserRole(user.id, $event.target.value)"
                    class="text-sm bg-gray-800/50 border border-purple-500/30 rounded px-2 py-1 text-gray-300"
                  >
                    <option value="user" class="bg-gray-800 text-gray-300">User</option>
                    <option value="admin" class="bg-gray-800 text-gray-300">Admin</option>
                  </select>
                  
                  <div class="flex gap-1">
                    <button 
                      v-if="!user.approved"
                      @click="approveUserStatus(user.id)"
                      class="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs font-medium transition-colors flex items-center"
                    >
                      <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Approve
                    </button>
                    <button 
                      v-if="user.approved"
                      @click="rejectUserStatus(user.id)"
                      class="bg-orange-600 hover:bg-orange-700 text-white px-2 py-1 rounded text-xs font-medium transition-colors flex items-center"
                    >
                      <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Reject
                    </button>
                    <button 
                      @click="deleteUser(user.id)"
                      class="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs font-medium transition-colors flex items-center"
                    >
                      <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
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

// Approve User Status Button Handler
const approveUserStatus = async (userId) => {
  if (confirm('Are you sure you want to approve this user\'s status? They will be able to log in to the system.')) {
    try {
      const result = await authStore.acceptUserStatus(userId)
      if (result.success) {
        alert('User status approved successfully! The user can now log in to the system.')
        await refreshData()
      } else {
        alert('Error approving user status: ' + result.error)
      }
    } catch (error) {
      alert('Error approving user status')
      console.error(error)
    }
  }
}

// Reject User Status Button Handler
const rejectUserStatus = async (userId) => {
  if (confirm('Are you sure you want to reject this user\'s status? They will not be able to log in to the system.')) {
    try {
      const result = await authStore.rejectUserStatus ? await authStore.rejectUserStatus(userId) : { success: false, error: 'rejectUserStatus not implemented in store' }
      if (result.success) {
        alert('User status rejected successfully! The user will not be able to log in.')
        await refreshData()
      } else {
        alert('Error rejecting user status: ' + result.error)
      }
    } catch (error) {
      alert('Error rejecting user status')
      console.error(error)
    }
  }
}

const formatDate = (timestamp) => {
  if (!timestamp) return 'Unknown'
  
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
}
</script>
