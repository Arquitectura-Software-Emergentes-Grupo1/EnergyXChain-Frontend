import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', name: 'login', component: () => import('../views/login.vue')
    },
    {
      path: '/register', name: 'register', component: () => import('../views/register.vue')
    },
    {
      path: '/forgot-password', name: 'forgot-password', component: () => import('../views/forgotPassword.vue')
    },
    {
      path: '/home', name: 'home', component: () => import('../views/home.vue')
    }
  ]
})

router.afterEach(() => {
  window.scrollTo(0, 0);
});
export default router
