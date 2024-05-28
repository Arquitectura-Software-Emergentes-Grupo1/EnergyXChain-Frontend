import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

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
      path: '/home', name: 'home', component: () => import('../views/home.vue'),  meta: { requiresAuth: true }
    },
    {
      path: '/perfil', name: 'perfil', component: () => import('../views/perfil.vue'),  meta: { requiresAuth: true }
    },
    {
      path: '/pagos', name: 'pagos', component: () => import('../views/pagos.vue'),  meta: { requiresAuth: true }
    }
  ]
})


router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth) {
    onAuthStateChanged(auth, user => {
      if (user) {
        next();
      } else {
        next({ name: 'login' });
      }
    });
  } else {
    next();
  }
});

router.afterEach(() => {
  window.scrollTo(0, 0);
});

export default router
