<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import NavbarLogin from './components/navbarLogin.vue'
import NavbarClient from './components/navbarClient.vue'
import { useGlobalStore } from '@/stores/globalStore';

const route = useRoute();
const globalStore = useGlobalStore();
const sharedVariable = computed(() => globalStore.sharedVariable);


const showNavbarLogin = computed(() => {
  return route.path === '/' || route.path === '/main-register';
});
const showNavbarClient = computed(() => {
  return route.path === '/proveedores' || route.path === '/historial' || route.path === '/pagar' || route.path === '/proveedorInfo' || route.path === '/home' || route.path === '/pagos' || route.path === '/pagar' || route.path === '/proveedor/id';
});
const showNavbarSupplier = computed(() => {
  return route.path === '/homeProveedor' || route.path === '/servicios' || route.path === '/nuevo-servicio' || route.path === '/my-clients' || route.path === '/client-info/:id' || route.path === '/ganancias';
});
</script>

<template>

  <header>
    <navbarLogin v-if="sharedVariable == 'login'"></navbarLogin >
    <navbarClient v-if="sharedVariable == 'client'"></navbarClient >
      <p v-if="sharedVariable == 'supplier'">HASHHASHHAS</p>
  </header>

  <body>
    <RouterView />
  </body>

  
</template>

<style>
/* Estilos originales */
#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.container{
  width: 90%;
  margin: 0 auto;
}


</style>
