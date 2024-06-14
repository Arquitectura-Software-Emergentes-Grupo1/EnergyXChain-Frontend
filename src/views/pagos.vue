
<template>
    <div class="container">
      <h1>Pagos</h1>
      
      <div class="sectionPagos">
        <button @click="pagos = true" :class=" pagos ? 'blue' : 'noblue'" >Mis Pagos</button>
        <p>|</p>
        <button @click="pagos = false" :class=" !pagos ? 'blue' : 'noblue'">Pendientes</button>
      </div>
      <misPagos v-if="pagos"></misPagos>

      <pendientes v-if="!pagos"></pendientes>
      <button class="logout-button" @click="logout()">Log Out</button>
  
    </div>
</template>
<script setup>
import misPagos from '@/components/pagos/misPagos.vue';
import pendientes from '@/components/pagos/pendientes.vue';
</script>

<script >
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';


const pagos = ref(true);

export default {
  
  setup() {
      const router = useRouter();  
      

  
      const logout = () => {
        signOut(getAuth())
          .then(() => {
            console.log('Usuario deslogueado');
            localStorage.removeItem('userData');
            router.push('/');
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const showMore = (id) => {
        console.log('Ver más', id);
      };
      
  
      return { logout, showMore, router};
    }
}
</script>

<style >
.logout-button {
  background-color: #024955;
  color: white;
  width: 160px;
  height: 48px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
}
h1{
  color: black;
  text-align: center;
}
body{
  background-color: white !important;
}
.sectionPagos{
  display: flex;
  justify-content: center;
}
.sectionPagos button{
  border: 0;
  background-color: white;
  
}

.blue{
  color:#024955;
  font-weight: bold;
  font-size:x-large;
}
.noblue{
  font-weight: 400;
  font-size:x-large;
  color: black;
}



</style>
