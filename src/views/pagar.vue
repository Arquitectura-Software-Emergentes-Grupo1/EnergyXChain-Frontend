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
        <label>Monto Total</label>
        <p style="font-size: 20px; font-weight: bold;">S/ {{ proveedorData.price }} PEN</p>
      </div>
      <div class="cardCTA" style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <img src="../assets/img/visa.png" style="border-radius: 15px; width: 500px;" alt="Visa" />
        <Button @click="contratar()" label="Contratar" style="background-color: #024955; border: #024955; width: 70%;" raised />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'; // Añadir computed aquí
import { useRouter } from 'vue-router';
import { getAuth, signOut } from 'firebase/auth';
import { API_BASE_URL } from '@/config';
import { useGlobalStore } from '@/stores/globalStore';

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

const creditCard = ref({
  titular: '',
  number: '',
  expiration: '',
  cvv: ''
});

const globalStore = useGlobalStore();
const sharedVariable = computed(() => globalStore.sharedVariable);

const userLogout = () => {
  localStorage.setItem('typeUser', 'login');
  globalStore.setSharedVariable('login');
};

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
      userLogout();
      router.push('/');
    })
    .catch((error) => {
      console.error('Error logging out:', error);
    });
};

const contratar = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}api/v0/sale`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: proveedorData.value.price,
        date: new Date().toISOString(),
        state: true,
        customerId: proveedorData.value.id, // Reemplaza con el campo correcto según tu modelo
        planId: proveedorData.value.planId // Reemplaza con el campo correcto según tu modelo
      })
    });
    if (!response.ok) {
      throw new Error('Error al realizar el pago');
    }
    const responseData = await response.json();
    console.log('Pago realizado con éxito:', responseData);
    // Aquí puedes manejar la respuesta como sea necesario (por ejemplo, redirigir o mostrar un mensaje)
  } catch (error) {
    console.error('Error al realizar el pago:', error);
    // Aquí puedes manejar errores como mostrar un mensaje de error al usuario
  }
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
.cardContainer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
}
.cardInfo {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.cardCTA {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
</style>
