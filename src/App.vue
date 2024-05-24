<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import NavbarLogin from './components/navbarLogin.vue'
import NavbarClient from './components/navbarClient.vue'

const route = useRoute();

const showNavbarLogin = computed(() => {
  return route.path === '/' || route.path === '/register';
});
</script>

<template>
  <header>
    <navbarLogin v-if="showNavbarLogin"></navbarLogin >
    <navbarClient v-else></navbarClient >
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
