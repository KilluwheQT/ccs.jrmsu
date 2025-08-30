import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth'
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  updateDoc,
  deleteDoc,
  orderBy 
} from 'firebase/firestore'
import { auth, db } from '../firebase/config'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const userProfile = ref(null)
  const loading = ref(true)
  const pendingUsers = ref([])
  const allUsers = ref([])

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => userProfile.value?.role === 'admin')
  const isApproved = computed(() => userProfile.value?.approved === true)

  const initAuth = () => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      user.value = firebaseUser
      if (firebaseUser) {
        await loadUserProfile(firebaseUser.uid)
      } else {
        userProfile.value = null
      }
      loading.value = false
    })
  }

  const loadUserProfile = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid))
      if (userDoc.exists()) {
        userProfile.value = { id: userDoc.id, ...userDoc.data() }
      }
    } catch (error) {
      console.error('Error loading user profile:', error)
    }
  }

  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      await loadUserProfile(result.user.uid)
      
      // Check if user is approved
      if (userProfile.value && !userProfile.value.approved && userProfile.value.role !== 'admin') {
        await signOut(auth)
        return { success: false, error: 'Your account is pending admin approval. Please contact an administrator.' }
      }
      
      return { success: true, user: result.user }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const register = async (email, password, name, course) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      
      // Check if this is an admin account (you can customize this logic)
      const isAdmin = email.includes('admin') || email.includes('ccs.edu.ph')
      
      // Create user profile
      const userProfile = {
        uid: result.user.uid,
        email: email,
        name: name,
        course: course,
        role: isAdmin ? 'admin' : 'user',
        approved: isAdmin ? true : false, // Admin accounts are auto-approved
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
      await setDoc(doc(db, 'users', result.user.uid), userProfile)
      
      if (isAdmin) {
        // Admin accounts can stay logged in
        return { 
          success: true, 
          message: 'Admin account created successfully! You can now access the admin dashboard.' 
        }
      } else {
        // Regular users need to wait for approval
        await signOut(auth)
        return { 
          success: true, 
          message: 'Account created successfully! Please wait for admin approval before signing in.' 
        }
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      userProfile.value = null
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Admin functions
  const fetchPendingUsers = async () => {
    try {
      const q = query(
        collection(db, 'users'),
        where('approved', '==', false),
        where('role', '==', 'user'),
        orderBy('createdAt', 'desc')
      )
      const querySnapshot = await getDocs(q)
      pendingUsers.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    } catch (error) {
      console.error('Error fetching pending users:', error)
    }
  }

  const fetchAllUsers = async () => {
    try {
      const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
      allUsers.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    } catch (error) {
      console.error('Error fetching all users:', error)
    }
  }

  const approveUser = async (userId) => {
    try {
      await updateDoc(doc(db, 'users', userId), {
        approved: true,
        updatedAt: new Date()
      })
      await fetchPendingUsers()
      await fetchAllUsers()
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const rejectUser = async (userId) => {
    try {
      await deleteDoc(doc(db, 'users', userId))
      await fetchPendingUsers()
      await fetchAllUsers()
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const updateUserRole = async (userId, role) => {
    try {
      await updateDoc(doc(db, 'users', userId), {
        role: role,
        updatedAt: new Date()
      })
      await fetchAllUsers()
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const deleteUser = async (userId) => {
    try {
      await deleteDoc(doc(db, 'users', userId))
      await fetchPendingUsers()
      await fetchAllUsers()
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const createAdminAccount = async (email, password, name) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      
      const adminProfile = {
        uid: result.user.uid,
        email: email,
        name: name,
        course: 'Admin',
        role: 'admin',
        approved: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
      await setDoc(doc(db, 'users', result.user.uid), adminProfile)
      
      return { success: true, user: result.user }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const approveCurrentUser = async () => {
    if (!user.value) return { success: false, error: 'No user logged in' }
    
    try {
      await updateDoc(doc(db, 'users', user.value.uid), {
        approved: true,
        role: 'admin',
        updatedAt: new Date()
      })
      
      // Reload user profile
      await loadUserProfile(user.value.uid)
      
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const acceptUserStatus = async (userId) => {
    try {
      await updateDoc(doc(db, 'users', userId), {
        approved: true,
        updatedAt: new Date()
      })
      await fetchPendingUsers()
      await fetchAllUsers()
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const rejectUserStatus = async (userId) => {
    try {
      await updateDoc(doc(db, 'users', userId), {
        approved: false,
        updatedAt: new Date()
      })
      await fetchPendingUsers()
      await fetchAllUsers()
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  return {
    user,
    userProfile,
    loading,
    pendingUsers,
    allUsers,
    isAuthenticated,
    isAdmin,
    isApproved,
    initAuth,
    login,
    register,
    logout,
    fetchPendingUsers,
    fetchAllUsers,
    approveUser,
    rejectUser,
    updateUserRole,
    deleteUser,
    createAdminAccount,
    approveCurrentUser,
    acceptUserStatus,
    rejectUserStatus
  }
})
