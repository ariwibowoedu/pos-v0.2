import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/modules/landing/LandingPage.vue'),
      redirect: '/login'
    },
    {
      path: '/login',
      component: () => import('@/modules/auth/AuthPage.vue')
    },
    {
      path: '/dashboard',
      component: () => import('@/modules/admin/DashboardAdm.vue')
    }
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (!auth.loading) {
    if (!auth.user && to.path !== '/login') return '/login'
    if (auth.user && to.path === '/login') return '/dashboard'
  }
})

export default router
