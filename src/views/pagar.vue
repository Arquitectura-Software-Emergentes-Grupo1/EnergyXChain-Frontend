<template>
  <div class="container">
    <h1>Realizar Pago</h1>
    <div class="cardContainer">
      <div class="cardInfo">
        <div class="flex flex-column gap-2" style="margin-bottom: 1rem;">
          <label for="username">Titular de tarjeta</label>
          <InputText id="username" v-model="creditCard.titular" aria-describedby="username-help" />
        </div>
        <div class="flex flex-column gap-2" style="margin-bottom: 1rem;">
          <label for="username">Número de tarjeta</label>
          <InputText id="username" v-model="creditCard.number" aria-describedby="username-help" />
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; width: 100%;">
          <div class="flex flex-column gap-2" style="margin-bottom: 1rem;">
            <label for="username">Fecha de expiración</label>
            <InputText id="username" v-model="creditCard.expiration" aria-describedby="username-help" />
          </div>
          <div class="flex flex-column gap-2" style="margin-bottom: 1rem;">
            <label for="username">CVV</label>
            <InputText id="username" v-model="creditCard.cvv" aria-describedby="username-help" />
          </div>
        </div>
        <label >Monto Total</label>
        <p style="font-size: 20px; font-weight: bold;">S/ 120.00 PEN</p>
      </div>
      <div class="cardCTA" style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <img src="../assets/img/visa.png" style="border-radius: 15px; width: 500px;">
        <Button @click="showMore()" label="Contratar" style="background-color: #024955; border: #024955; width: 70%;" raised />
      </div>
    </div>
  </div>
  </template>
  
  <script>
  import { getAuth, signOut } from 'firebase/auth';
  import { useRouter } from 'vue-router';
  import { ref, onMounted } from 'vue';
  import { useGlobalStore } from '@/stores/globalStore';
  import { computed } from 'vue';

  export default {
    
    setup() {
      const globalStore = useGlobalStore();
      const sharedVariable = computed(() => globalStore.sharedVariable);

      const userLogout = () => {
          localStorage.setItem('typeUser', 'login');
globalStore.setSharedVariable('login');
      };
      const router = useRouter();
      const userData = ref(null);
      const creditCard = ref(null);
      creditCard.value = {
        titular: 'Kendall Ramiro',
        number: '73647482673',
        expiration: '02/2026',
        cvv: '666'
      }
      onMounted(() => {
        const storedUserData = JSON.parse(localStorage.getItem('userData'));
        if (storedUserData) {
          userData.value = storedUserData;
        } else {
          router.push('/');
        }
        
      });
  
      const logout = () => {
        signOut(getAuth())
          .then(() => {
            console.log('Usuario deslogueado');
            localStorage.removeItem('userData');
            userLogut();
            router.push('/');
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const showMore = (id) => {
        console.log('Ver más', id);
      };
  
      return { userData, logout, showMore, creditCard};
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
  .cardInfo{
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 2rem;
    border-radius: 20px;
  }
  .cardContainer{
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 2rem;
    height: 50vh;
    margin: 0 auto;
  }
  </style>
  