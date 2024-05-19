<template>
  <div class="login-card">
    <img id="logo"  src="../../../src/assets/img/logo.png"  alt="logo">
    <div class="login-title">Iniciar sesión para acceder a EnergyXChain</div>
    <FloatLabel style="margin-bottom: 30px;">
      <InputText id="email" v-model="email" />
      <label for="email" class="input-label">Correo Electrónico</label>
    </FloatLabel>
    <FloatLabel style="margin-bottom: 25px;">
      <InputText id="password" v-model="password" />
      <label for="password" class="input-label">Contraseña</label>
    </FloatLabel>
    <div class="forgot-password" style="margin-bottom: 10px;">¿Olvidó la contraseña? <RouterLink to="/forgot-password" style="color: #024955">Cambiar contraseña</RouterLink></div>
    <button class="login-button" style="margin-bottom: 25px;">Iniciar Sesión</button>
    <div class="register">¿Sin registrarte aún? <RouterLink to="/register" style="color: #024955">Registrar</RouterLink></div>
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
    const email = ref('');
    const password = ref('');
    return { email, password };
  }
}
</script>

<style scoped>
.login-card {
    background-color: #C3EDF5;
  border-radius: 14px;
  padding: 20px;
  text-align: center;
  max-width: 400px;
  margin: auto;
  margin-top: 10%;
}

#logo {
  height: 105px;
  width: 198px;
  margin-bottom: 20px;
}

.login-title{
    font-size: 16px;
    margin-bottom: 30px;
}

.forgot-password{
    font-size: 16px;
}
.register {
    font-size: 16px;
}

.login-button {
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
