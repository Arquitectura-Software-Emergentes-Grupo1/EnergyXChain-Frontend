<template>
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh;">
      <div v-if="supplierData">
        <p><strong>uId:</strong>{{ supplierData.uid }}</p>
        <p><strong>Nombre:</strong> {{ supplierData.name }}</p>
        <p><strong>Teléfono:</strong> {{ supplierData.phone }}</p>
        <p><strong>Email:</strong> {{ supplierData.email }}</p>
        <p><strong>Descripción:</strong> {{ supplierData.description }}</p>

  
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
    import { API_BASE_URL } from '@/config';
    
    export default {
      
      setup() {
        const router = useRouter();
        const supplierData = ref(null);
        const auth = getAuth();
        const user = ref(auth.currentUser);
  
        const fetchCustomerData = async (uid) => {
          try {
            const response = await fetch(`${API_BASE_URL}api/v0/supplier/uid=${uid}`,{
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': true
              }
            
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            supplierData.value = jsonData;
          } catch (error) {
            console.error('Error fetching customer data:', error);
            
          }
        };
  
        
        onMounted(() => {
          const storedUserData = JSON.parse(localStorage.getItem('userData'));
          if (storedUserData) {
            //userData.value = storedUserData;
            fetchCustomerData(storedUserData.uid); 
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
  
       
    
        return { user,supplierData, logout };
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
    