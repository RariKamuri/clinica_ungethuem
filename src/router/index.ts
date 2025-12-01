import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = createRouter({
  history: createWebHistory('/app'),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/recover-password',
      name: 'RecoverPassword',
      component: () => import('@/views/RecoverPasswordView.vue'),
    },
    {
      path: '/new-password',
      name: 'NewPassword',
      component: () => import('@/views/NewPasswordView.vue'),
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/DashboardView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

// Navigation guard for protected routes
router.beforeEach((to, from, next) => {
  const { isAuthenticated, isLoading } = useAuth()

  if (to.meta.requiresAuth) {
    if (isLoading.value) {
      // Wait for auth check to complete
      const checkAuth = setInterval(() => {
        if (!isLoading.value) {
          clearInterval(checkAuth)
          if (isAuthenticated.value) {
            next()
          } else {
            next({ name: 'Login' })
          }
        }
      }, 100)
    } else {
      if (isAuthenticated.value) {
        next()
      } else {
        next({ name: 'Login' })
      }
    }
  } else {
    next()
  }
})

export default router

