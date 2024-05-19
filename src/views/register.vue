<template>
    <div class="register-card">
        <div style="font-size: 40px; color: #024955; font-weight: bold; margin-bottom: 15px;">Registro</div>
      <div class="register-title" style="margin-bottom: 30px;">Crear una cuenta para acceder a EnergyXChain</div>
      <FloatLabel style="margin-bottom: 30px;">
        <InputText id="name" v-model="name" />
        <label for="name" class="input-label">Nombres</label>
      </FloatLabel>
      <FloatLabel style="margin-bottom: 30px;">
        <InputText id="phoneNumber" v-model="phoneNumber" />
        <label for="phoneNumber" class="input-label">Número Telefónico</label>
      </FloatLabel>
      <FloatLabel style="margin-bottom: 30px;">
        <InputText id="age" v-model="age" />
        <label for="age" class="input-label">Edad</label>
      </FloatLabel>
      <FloatLabel style="margin-bottom: 30px;">
        <InputText id="typeUser" v-model="typeUser" />
        <label for="typeUser" class="input-label">Tipo de Usuario</label>
      </FloatLabel>
      <FloatLabel style="margin-bottom: 30px;">
        <InputText id="email" v-model="email" />
        <label for="email" class="input-label">Correo Electrónico</label>
      </FloatLabel>
      <FloatLabel style="margin-bottom: 30px;">
        <InputText id="password" v-model="password" />
        <label for="password" class="input-label">Contraseña</label>
      </FloatLabel>
      
       <Checkbox v-model="privacyTerms" inputId="privacyTerms" name="privacyTerms" value="privacyTerms" />
       <label for="privacyTerms" class="ml-2"> Acepto los Términos y Condiciones de EnergyXChain </label>
      
       <button class="register-button" style="margin-bottom: 15px;">Registrarse</button>
      <div style="font-size: 15px;">¿Ya eres usuario? <RouterLink to="/" style="color:#024955">Iniciar Sersión</RouterLink></div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import InputText from 'primevue/inputtext';
  import FloatLabel from 'primevue/floatlabel';
import Checkbox from 'primevue/checkbox';

  export default {
    components: {
      InputText,
      FloatLabel, 
      Checkbox
    },
    setup() {
      const name = ref('');
      const phoneNumber = ref('');
      const age = ref('');
      const typeUser = ref('');
      const email = ref('');
      const password = ref('');
      const privacyTerms = ref(false);
      return { name, phoneNumber, age, typeUser, email, password, privacyTerms };
    }
  }
  </script>
  
  <style scoped>
  .register-card {
      background-color: #C3EDF5;
    border-radius: 14px;
    padding: 20px;
    text-align: center;
    max-width: 500px;
    margin: auto;
    margin-top: 7%;
  }
  
  
  .register-title .forgot-password .register{
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
  