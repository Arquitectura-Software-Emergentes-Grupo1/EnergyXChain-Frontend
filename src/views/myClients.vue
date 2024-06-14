<template>
    <div class="container" style="margin-top: 100px;">
      <h1>Mis Clientes</h1>
      <div class="card">
        <DataTable :value="clients" stripedRows paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
          <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"></Column>
          <Column header="Perfil">
            <template #body="slotProps">
              <button class="profile-button" @click="showMore(slotProps.data.idClient)">Ver Perfil</button>
            </template>
          </Column>
        </DataTable>
      </div>
      <button class="logout-button" @click="logout()">Log Out</button>
    </div>
  </template>
  
  <script>
  import { getAuth, signOut } from 'firebase/auth';
  import { useRouter } from 'vue-router';
  import { ref, onMounted } from 'vue';
  
  export default {
    setup() {
      const router = useRouter();  
  
      const clients = ref([
        {
          idClient: 1,
          nameClient: 'Cliente 1',
          service: 'Servicio 1',
          amount: 100,
          state: true,
          profile: ''
        },
        {
          idClient: 2,
          nameClient: 'Cliente 2',
          service: 'Servicio 2',
          amount: 100,
          state: true,
          profile: ''
        },
        {
          idClient: 3,
          nameClient: 'Cliente 3',
          service: 'Servicio 3',
          amount: 100,
          state: true,
          profile: ''
        }
      ]);
  
      const columns = [
        { field: 'idClient', header: 'ID Cliente' },
        { field: 'nameClient', header: 'Nombre del Cliente' },
        { field: 'service', header: 'Servicio Adquirido' },
        { field: 'amount', header: 'Monto' },
        { field: 'state', header: 'Estado' },
      ]; 
  
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
        router.push({ name: 'client-info', params: { id } });
      };
  
      return { logout, showMore, columns, clients, router };
    }
  }
  </script>
  
  <style scoped>
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
  .profile-button{
    background-color: #024955;
    color: white;
    width: 110px;
    height: 35px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 20px;
  }
  
  .profile-button:hover {
    background-color: #40585c;
  }
  
  h1 {
    color: black;
    text-align: center;
  }
  
  .container {
    background-color: white;
  }
  
  .card {
    margin: auto;
    padding: 20px;
  }
  
  .blue {
    color: #024955;
    font-weight: bold;
    font-size: x-large;
  }
  
  .noblue {
    font-weight: 400;
    font-size: x-large;
    color: black;
  }
  </style>
  