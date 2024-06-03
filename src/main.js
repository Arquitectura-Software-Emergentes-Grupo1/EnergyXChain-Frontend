
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

//Firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Chart from 'primevue/chart';
import InputText from 'primevue/inputtext';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgEwoREPQMW7tx0_qjZqtOi6zYXKrWT-c",
  authDomain: "energyxchain.firebaseapp.com",
  projectId: "energyxchain",
  storageBucket: "energyxchain.appspot.com",
  messagingSenderId: "862544778168",
  appId: "1:862544778168:web:1843475321af2fc09ab54d",
  measurementId: "G-4TX6D8SLZX"
};

// Initialize Firebase
initializeApp(firebaseConfig);

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
app.use(router)
app.use(PrimeVue)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Button', Button)
app.component('Chart', Chart)
app.component('InputText', InputText)
app.mount('#app')
