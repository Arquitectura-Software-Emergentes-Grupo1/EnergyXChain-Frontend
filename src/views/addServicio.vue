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
      <InputText id="price" v-model="price" />
      <label for="price" class="input-label">Precio</label>
    </FloatLabel>
    
    <button class="register-button" style="margin-bottom: 15px;" @click="create()">Publicar</button>
    
  </div>
</template>

<script>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import Checkbox from 'primevue/checkbox';
import { useRouter } from 'vue-router';

// Models
import user from '../models/user.js';

export default {
  components: {
    InputText,
    FloatLabel, 
    Checkbox
  },
  setup() {
    const router = useRouter();
    const name = ref('');
    const description = ref('');
    const price = ref('');
    const isError = ref(false);

    const validateForm = () => {
      isError.value = false;

      if (!name.value || !description.value || !price.value) {
        isError.value = true;
      }

      return !isError.value;
    };

    const create = () => {
      // Validar todos los campos antes de registrar al usuario
      if (!validateForm()) {
        console.log('Error en el formulario')
        return;
      }

      //LLAMAR SERVICIO CREACIÓN

      router.push('/servicios');
    };

    return { name, description, price, isError, create };
  }
}
</script>

<style>
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
