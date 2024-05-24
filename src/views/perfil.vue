<template>
  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh;">
    <div v-if="userData">
      <p><strong>uId:</strong>{{ userData.uid }}</p>
      <p><strong>Nombre:</strong> {{ userData.name }}</p>
      <p><strong>Teléfono:</strong> {{ userData.phoneNumber }}</p>
      <p><strong>Email:</strong> {{ userData.email }}</p>
      <p><strong>Edad:</strong> {{ userData.age }}</p>
      <p><strong>Tipo de usuario:</strong> {{ userData.typeUser }}</p>

      <button class="logout-button" @click="logout()">Log Out</button>
    </div>
    <div v-else>
      <p>Loading user data...</p>
    </div>
  </div>
  </template>
  
  <script>
  import { getAuth, signOut } from 'firebase/auth';
  import { useRouter } from 'vue-router';
  import { ref, onMounted } from 'vue';

  export default {
    
    setup() {
      const router = useRouter();
      const userData = ref(null);
      
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
            router.push('/');
          })
          .catch((error) => {
            console.log(error);
          });
      };

     
  
      return { userData, logout };
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

  </style>
  