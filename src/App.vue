<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import NavbarLogin from './components/navbarLogin.vue'
import NavbarClient from './components/navbarClient.vue'
import NavbarSupplier from './components/navbarSupplier.vue';
import { useGlobalStore } from '@/stores/globalStore';

const route = useRoute();
const globalStore = useGlobalStore();
const sharedVariable = computed(() => globalStore.sharedVariable);

</script>

<template>

  <header>
    <navbarLogin v-if="sharedVariable == 'login'"></navbarLogin >
    <navbarClient v-if="sharedVariable == 'client'"></navbarClient >
      <NavbarSupplier v-if="sharedVariable == 'supplier'"></NavbarSupplier>
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
