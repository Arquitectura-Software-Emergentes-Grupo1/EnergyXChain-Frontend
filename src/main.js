
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Vue3Toasity from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { MotionPlugin } from '@vueuse/motion';
import PrimeVue from 'primevue/config'

// PrimeVue
import 'primevue/resources/themes/saga-blue/theme.css' 
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

const app = createApp(App)
app.use(
    Vue3Toasity,
    {
      autoClose: 3000,
      // ...
    },
  )
app.use(MotionPlugin)
app.use(createPinia())
app.use(PrimeVue)
app.use(router)

app.mount('#app')
