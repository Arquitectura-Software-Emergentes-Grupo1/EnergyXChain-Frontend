<template>
  <div class="container">
    <h1>{{ proveedorData.name }}</h1>
    <div class="proveedorContainer">
      <div class="proveedorInfo">
        <p><span style="font-weight: bold;">Empresa:</span> {{ proveedorData.name }}</p>
        <p><span style="font-weight: bold;">Teléfono:</span> {{ proveedorData.phone }}</p>
        <p><span style="font-weight: bold;">Precio:</span> {{ proveedorData.price }}</p>
        <p><span style="font-weight: bold;">Correo:</span> {{ proveedorData.email }}</p>
      </div>
      <div class="proveedorCTA">
        <img src="../assets/img/proveedor.webp" alt="Proveedor" style="border-radius: 50%; width: 250px;">
        <Button @click="hire()" label="Contratar" style="background-color: #024955; border: #024955; width: 70%;" raised />
      </div>
    </div>
    <div class="proveedorDesc">
      <p><span style="font-weight: bold;">Descripción:</span></p>
      <p>{{ proveedorData.description }}</p>
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
const proveedorData = ref({
  id: null,
  name: '',
  companyName: '',
  cellphone: '',
  price: null,
  description: '',
  email: ''
});

onMounted(async () => {
  const storedUserData = JSON.parse(localStorage.getItem('userData'));
  if (!storedUserData) {
    router.push('/');
    return;
  }

  const { id } = router.currentRoute.value.params;
  try {
    const response = await fetch(`${API_BASE_URL}api/v0/supplier/${id}`, {
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
    proveedorData.value = jsonData;
  } catch (error) {
    console.error('Error fetching supplier data:', error);
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
      console.error('Error logging out:', error);
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
.proveedorContainer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
}
.proveedorInfo {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.proveedorCTA {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.proveedorDesc {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  min-height: 200px;
  overflow-y: auto;
}
</style>
