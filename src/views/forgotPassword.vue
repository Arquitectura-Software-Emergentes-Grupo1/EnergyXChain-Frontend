<template>
    <div class="forgot-password-card">
        <div style="font-size: 40px; color: #024955; font-weight: bold; margin-bottom: 30px;">Restablecer Contraseña</div>
        <div class="forgot-password-title" style="margin-bottom: 30px;">Restablecer contraseña para recuperar la cuenta y acceder a EnergyXChain</div>
        <FloatLabel style="margin-bottom: 15px;">
            <InputText id="email" v-model="email" />
            <label for="email" class="input-label">Correo Electrónico</label>
        </FloatLabel>
        <button class="forgot-password-button" style="margin-bottom: 30px;">Restablecer</button>
        <div class="register">¿Ya eres usuario? <RouterLink to="/" style="color: #024955">Iniciar Sesión</RouterLink></div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import InputText from 'primevue/inputtext';
  import FloatLabel from 'primevue/floatlabel';
  
  export default {
    components: {
      InputText,
      FloatLabel
    },
    setup() {
      
    }
  }
  </script>
  
  <style scoped>
  .forgot-password-card {
      background-color: #C3EDF5;
    border-radius: 14px;
    padding: 20px;
    text-align: center;
    max-width: 600px;
    margin: auto;
    margin-top: 10%;
  }
  
  
  .forgot-password{
      font-size: 16px;
  }
  .forgot-password {
      font-size: 16px;
  }
  
  .forgot-password-button {
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
    padding-left: 90px;
  }
  
  .p-inputtext {
    width: 70%;
    margin: 0 auto;
  }
  </style>
  