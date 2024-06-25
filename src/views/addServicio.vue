<template>
  <div class="register-card">
    <div style="font-size: 40px; color: #024955; font-weight: bold; margin-bottom: 15px;">Crear Servicio</div>
    <div class="register-title" style="margin-bottom: 30px;">Crear el servicio en EnergyXChain</div>
    <FloatLabel style="margin-bottom: 30px;">
      <InputText id="name" v-model="name" />
      <label for="name" class="input-label">Nombre del Servicio</label>
    </FloatLabel>
    <FloatLabel style="margin-bottom: 30px;">
      <InputText id="description" v-model="description" />
      <label for="description" class="input-label">Descripción</label>
    </FloatLabel>
    <FloatLabel style="margin-bottom: 30px;">
      <InputNumber class="custom-input" id="price" v-model="price" :minFractionDigits="2"/>
      <label for="price" class="input-label">Precio</label>
    </FloatLabel>
    
    <button class="register-button" style="margin-bottom: 15px;" @click="create()">Publicar</button>
    
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { API_BASE_URL } from '@/config';

import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import InputNumber from 'primevue/inputnumber';

export default {
  components: {
    InputText,
    FloatLabel,
    InputNumber
  },
  setup() {
    const router = useRouter();
    const auth = getAuth();
    const user = auth.currentUser;
    const name = ref('');
    const description = ref('');
    const price = ref(0); // Inicializar price como número
    const isError = ref(false);
    const supplierData = ref(null);

    const validateForm = () => {
      isError.value = false;

      if (!name.value || !description.value || !price.value) {
        isError.value = true;
      }

      return !isError.value;
    };

    const create = async () => {
      if (!validateForm()) {
        console.log('Error en el formulario')
        return;
      }

      const uid = user.uid;

      try {
        const response = await fetch(`${API_BASE_URL}api/v0/supplier/uid=${uid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': true
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener los datos del proveedor');
        }

        const jsonData = await response.json();
        supplierData.value = jsonData;

        
        const requestBody = {
          name: name.value,
          description: description.value,
          fee: parseFloat(price.value),
          supplierId: supplierData.value.id, // Usar el id del proveedor obtenido
        };

        const createResponse = await fetch(`${API_BASE_URL}api/v0/plan`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': true
          },
          body: JSON.stringify(requestBody),
        });

        if (!createResponse.ok) {
          throw new Error('Error al crear el servicio');
        }

        router.push('/servicios');
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    onMounted(async () => {
     
      await fetchSupplierData();
    });

    const fetchSupplierData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}api/v0/supplier/uid=${uid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': true
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener los datos del proveedor');
        }

        const jsonData = await response.json();
        supplierData.value = jsonData;
      } catch (error) {
        console.error('Error fetching supplier data:', error);
      }
    };

    return { name, description, price, isError, create };
  }
};
</script>

<style scoped>
.custom-input {
  width: 96%;
}

.register-card {
  background-color: #C3EDF5;
  border-radius: 14px;
  padding: 20px;
  text-align: center;
  max-width: 500px;
  margin: auto;
  margin-top: 7%;
}

.register-title .forgot-password .register {
  font-size: 16px;
}

.register-button {
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

.input-label {
  display: block;
  margin-bottom: 8px;
  text-align: left;
  padding-left: 8px;
}

.p-inputtext {
  width: 97%;
  margin: 0 auto;
}
</style>
