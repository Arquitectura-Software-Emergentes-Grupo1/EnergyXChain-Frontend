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
      path: '/proveedores', name: 'proveedores', component: () => import('../views/listProveedores.vue')
    },
    {
      path: '/historial', name: 'historial', component: () => import('../views/historial.vue')
    },
    {
      path: '/home', name: 'home', component: () => import('../views/home.vue'),  meta: { requiresAuth: true }
    },
    {
      path: '/perfil', name: 'perfil', component: () => import('../views/perfil.vue'),  meta: { requiresAuth: true }
    },
    {
      path: '/pagos', name: 'pagos', component: () => import('../views/pagos.vue'),  meta: { requiresAuth: true }
    },
    {
      path: '/pagar', name: 'pagar', component: () => import('../views/pagar.vue'),  meta: { requiresAuth: true }
    },
    {
      path: '/proveedor/:id', name: 'proveedor-detail', component: () => import('../views/proveedorInfo.vue'),  meta: { requiresAuth: true }
    },
    {
      path: '/homeProveedor', name: 'homeProveedor', component: () => import('../views/homeProveedor.vue'),  meta: { requiresAuth: true }
    },
    {
      path: '/servicios', name: 'servicios', component: () => import('../views/misServicios.vue'),  meta: { requiresAuth: true }
    },
    {
      path: '/nuevo-servicio', name: 'nuevo-servicio', component: () => import('../views/addServicio.vue'),  meta: { requiresAuth: true }
    },

    //Views of Suppliers
    {
      path: '/my-clients', name: 'my-clients', component: () => import('../views/myClients.vue'),  meta: { requiresAuth: true }
    },
    {
      path: '/client-info/:id', name: 'client-info', component: () => import('../views/clientInfo.vue'),  meta: { requiresAuth: true }
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
