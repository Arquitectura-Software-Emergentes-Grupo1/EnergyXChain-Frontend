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
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const router = useRouter();
const products = ref([]);
const columns = [
  { field: 'name', header: 'Proveedor' },
  { field: 'price', header: 'Precio' },
  { field: 'description', header: 'Descripción' },
];

const fetchData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}api/v0/supplier`, {
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
    products.value = jsonData;
  } catch (err) {
    console.error('Error fetching supplier data:', err);
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
      console.error('Error logging out:', error);
    });
};

const showMore = (id) => {
  router.push({ name: 'proveedor-detail', params: { id } });
};

onMounted(fetchData);
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
h1 {
  color: black;
  text-align: center;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.card {
  width: 100%;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #f0f0f0;
}
</style>
