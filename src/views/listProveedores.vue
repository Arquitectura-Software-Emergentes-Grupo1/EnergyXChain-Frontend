<template>
  <div class="container">
    <h1>Lista de proveedores</h1>
      <div class="card">
          <DataTable :value="products" stripedRows paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
            <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"></Column>
            <Column header="Acción">
              <template #body="slotProps">
                  <Button @click="showMore(slotProps.data.id)" label="Ver más" style="background-color: #024955; border: #024955;" raised />
              </template>
            </Column>
          </DataTable>
      </div>
    <button class="logout-button" @click="logout()">Log Out</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, signOut } from 'firebase/auth';
import { API_BASE_URL } from '@/config';

const router = useRouter();

const data = ref(null);
const loading = ref(true);
const error = ref(null);
const columns = [
  { field: 'supplier', header: 'Proveedor' },
  { field: 'companyName', header: 'Nombre de la Empresa' },
  { field: 'precio', header: 'Precio' },
  { field: 'description', header: 'Descripción' },
];
const products = ref([
  {
    id: 1,
    supplier: 'Proveedor 1',
    companyName: 'Empresa 1',
    precio: 100,
    description: 'lorem ipsum...',
    action: 'Acción 1'
  },
  {
    id: 2,
    supplier: 'Proveedor 2',
    companyName: 'Empresa 2',
    precio: 200,
    description: 'lorem ipsum...',
    action: 'Acción 2'
  },
  {
    id: 3,
    supplier: 'Proveedor 3',
    companyName: 'Empresa 3',
    precio: 300,
    description: 'lorem ipsum...',
    action: 'Acción 3'
  },
]);

const fetchData = async () => {
  try {
      const response = await fetch(`${API_BASE_URL}api/v0/supplier`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': true
        }
      
      });
      console.log('Respuesta:', response);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      console.log('Datos recibidos:', jsonData);

      data.value = jsonData;  
      products.value = jsonData; // Asigna los datos a products
  } catch (err) {
      error.value = err.message;
  } finally {
      loading.value = false;
  }
};



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
  router.push({ name: 'proveedor-detail', params: { id } });
};

onMounted(fetchData);
</script>

<style>
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
h1 {
color: black;
text-align: center;
}
body {
background-color: white !important;
}
.sectionPagos {
display: flex;
justify-content: center;
}
.sectionPagos button {
border: 0;
background-color: white;
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