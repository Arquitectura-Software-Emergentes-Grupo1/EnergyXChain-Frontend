<script setup>
import { RouterLink, RouterView } from 'vue-router'

import NavBar from './components/NavBar.vue'


</script>

<template>
  <header>
    <NavBar />
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
  color: #2c3e50;
}
.container{
  width: 90%;
  margin: 0 auto;
}
body{
  background-color: #008ba3;
}

</style>
