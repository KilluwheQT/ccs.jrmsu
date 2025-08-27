import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Forum from '../views/Forum.vue'
import About from '../views/About.vue'
import Faculty from '../views/Faculty.vue'
import HallOfFame from '../views/HallOfFame.vue'
import Events from '../views/Events.vue'
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'
import { auth } from '../firebase/config'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/forum', name: 'Forum', component: Forum },
  { path: '/about', name: 'About', component: About },
  { path: '/faculty', name: 'Faculty', component: Faculty },
  { path: '/hall-of-fame', name: 'HallOfFame', component: HallOfFame },
  { path: '/events', name: 'Events', component: Events },
  { path: '/login', name: 'Login', component: Login },
  { 
    path: '/admin', 
    name: 'Admin', 
    component: Admin,
    meta: { requiresAdmin: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard for admin routes
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAdmin) {
    // Wait for auth to be initialized
    await new Promise(resolve => {
      const unsubscribe = auth.onAuthStateChanged(() => {
        unsubscribe()
        resolve()
      })
    })
    
    // Check if user is admin
    const user = auth.currentUser
    if (!user) {
      next('/login')
      return
    }
    
    // You might want to check the user's role in Firestore here
    // For now, we'll allow access if user is authenticated
    next()
  } else {
    next()
  }
})

export default router
