<template>
  <div class="container">
    <h1>Lista de planes</h1>
    <div class="card">
      <DataTable :value="plans" stripedRows paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
        <Column field="name" header="Nombre"></Column>
        <Column field="description" header="Descripción"></Column>
        <Column field="fee" header="Tarifa"></Column>
        <Column header="Proveedor">
          <template #body="slotProps">
            {{ slotProps.data.supplier.name }}
          </template>
        </Column>
        <Column header="Acción">
          <template #body="slotProps">
            <Button @click="showMore(slotProps.data.id)" label="Ver más" style="background-color: #024955; border: #024955;" raised />
          </template>
        </Column>
      </DataTable>
    </div>
    <button class="logout-button" @click="logout()">Cerrar sesión</button>
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
const plans = ref([]);
const columns = [
  { field: 'name', header: 'Nombre' },
  { field: 'description', header: 'Descripción' },
  { field: 'fee', header: 'Tarifa' },
];

const fetchData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}api/v0/plan`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': true
      }
    });
    if (!response.ok) {
      throw new Error('Error de red al obtener los planes');
    }
    const jsonData = await response.json();
    plans.value = jsonData;
  } catch (error) {
    console.error('Error al obtener los datos de los planes:', error);
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
      console.error('Error al cerrar sesión:', error);
    });
};

const showMore = (id) => {
  router.push({ name: 'detalle-plan', params: { id } });
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
