<template>
  <div class="container">
    <h1>{{ planData.name }}</h1>
    <div class="planContainer">
      <div class="planInfo">
        <p><span style="font-weight: bold;">Nombre:</span> {{ planData.name }}</p>
        <p><span style="font-weight: bold;">Descripción:</span> {{ planData.description }}</p>
        <p><span style="font-weight: bold;">Tarifa:</span> {{ planData.fee }}</p>
        <p><span style="font-weight: bold;">Proveedor:</span> {{ planData.supplier.name }}</p>
      </div>
      <div class="planCTA">
        <!-- Aquí puedes agregar cualquier botón o acción relacionada con el plan -->
        <Button @click="hire()" label="Contratar" style="background-color: #024955; border: #024955; width: 70%;" raised />
      </div>
    </div>
    <div class="planDesc">
      <p><span style="font-weight: bold;">Detalles del plan:</span></p>
      <p>{{ planData.description }}</p>
    </div>
    <button class="logout-button" @click="logout()">Cerrar sesión</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, signOut } from 'firebase/auth';
import { API_BASE_URL } from '@/config';

const router = useRouter();
const planData = ref({
  id: null,
  name: '',
  description: '',
  fee: null,
  supplier: {
    id: null,
    name: ''
  }
});

onMounted(async () => {
  const storedUserData = JSON.parse(localStorage.getItem('userData'));
  if (!storedUserData) {
    router.push('/');
    return;
  }

  const { id } = router.currentRoute.value.params;
  try {
    const response = await fetch(`${API_BASE_URL}api/v0/plan/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': true
      }
    });
    if (!response.ok) {
      throw new Error('Error al obtener los datos del plan');
    }
    const jsonData = await response.json();
    planData.value = jsonData;
  } catch (error) {
    console.error('Error fetching plan data:', error);
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
      console.error('Error al cerrar sesión:', error);
    });
};

const hire = () => {
  router.push({ name: 'pagar' });
};
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
.planContainer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
}
.planInfo {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.planCTA {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.planDesc {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  min-height: 200px;
  overflow-y: auto;
}
</style>
