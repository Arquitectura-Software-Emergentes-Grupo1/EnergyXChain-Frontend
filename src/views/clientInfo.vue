<template>
    <div class="container">
      <h1 style="margin-top: 100px;">{{ clientData.name }}</h1>
      <div class="clientContainer">
        <div class="clientInfo">
          <p> <span style="font-weight: bold;">Teléfono:</span> {{ clientData.phoneNumber }}</p>
          <p> <span style="font-weight: bold;">Edad:</span> {{ clientData.age }}</p>
          <p> <span style="font-weight: bold;">Correo Electrónico:</span> {{ clientData.email }}</p>
        </div>
        <div class="clientCTA">
          <img src="../assets/img/client.webp" style="border-radius: 50%; width: 250px;">
          
        </div>
      </div>

        <div class="container" style="margin-top: 60px;">
            <div class="card">
                <DataTable :value="dataClientTable" stripedRows paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
                <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"></Column>
               
                </DataTable>
            </div>
            <button class="logout-button" @click="logout()">Log Out</button>
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
        const clientData = ref(null);

        clientData.value = {
          id: 1,
          name: 'Pedro Mansilla Perez',
          phoneNumber: '987 362 273',
          age: 25,
          email: 'pedrito12@gmail.com'
        };
        console.log(clientData.value);
        onMounted(() => {
          const storedUserData = JSON.parse(localStorage.getItem('userData'));
          if (storedUserData) {
            userData.value = storedUserData;
          } else {
            router.push('/');
          }
          
        });

        const dataClientTable = ref([
        {
          idClient: 1,
          service: 'Servicio 1',
          state: true,
          amount: 100,
        },
        {
          idClient: 1,
          service: 'Servicio 2',
          state: true,
          amount: 100,
        },
        {
          idClient: 1,
          service: 'Servicio 3',
          state: true,
          amount: 100,
        }
      ]);
  
      const columns = [
        { field: 'service', header: 'Servicio Adquirido' },
        { field: 'state', header: 'Estado' },
        { field: 'amount', header: 'Monto' },
      ]; 
    
        const logout = () => {
          signOut(getAuth())
            .then(() => {
              console.log('Usuario deslogueado');
              localStorage.removeItem('userData');
              userLogout();
              router.push('/');
            })
            .catch((error) => {
              console.log(error);
            });
        };
  
        const hire = () => {
          router.push({ name: 'pagar'});
        };
    
        return { userData, logout, hire, clientData, logout, columns,router, dataClientTable};

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
    .clientInfo{
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 2rem;
      background-color: #C3EDF5;
      border-radius: 20px;
    }
    .clientDesc{
      display: flex;
      flex-direction: column;
      padding: 0 2rem;
      background-color: #C3EDF5;
      border-radius: 20px;
      margin-top: 2rem;
      height: 400px;
    }
    .clientCTA{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1rem;
    }
    .clientContainer{
      display: grid;
      grid-template-columns: 3fr 1fr;
      gap: 2rem;
      margin-top: 2rem;
    }
    </style>
    