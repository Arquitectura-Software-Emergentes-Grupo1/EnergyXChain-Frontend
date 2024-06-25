<template>
  <div class="login-card">
    <img id="logo" src="../assets/img/logo.png" alt="logo">
    <div class="login-title">Iniciar sesión para acceder a EnergyXChain</div>
    <FloatLabel style="margin-bottom: 30px;">
      <InputText id="email" v-model="email" />
      <label for="email" class="input-label">Correo Electrónico</label>
    </FloatLabel>
    <FloatLabel style="margin-bottom: 25px;">
      <InputText id="password" v-model="password" :type="'password'" />
      <label for="password" class="input-label">Contraseña</label>
    </FloatLabel>
    <label for="typeUser" class="input-label">Tipo de Usuario</label>
    <FloatLabel style="margin-bottom: 30px;  ">
      <select id="typeUser" v-model="typeUser" class="input-select" style="color: #808080;width: 96%; padding: 10px; font-size: 16px; border: 1px solid #ccc; border-radius: 4px; appearance: none; background-color: #fff;">
        <option value="" disabled >Seleccione Tipo de Usuario</option>
        <option value="cliente">Cliente</option>
        <option value="proveedor">Proveedor</option>
      </select>
    </FloatLabel>
   
    <div class="forgot-password" style="margin-bottom: 10px;">¿Olvidó la contraseña? <RouterLink to="/forgot-password" style="color: #024955">Cambiar contraseña</RouterLink></div>
    <button class="login-button" style="margin-bottom: 25px;" @click="login()">Iniciar Sesión</button>
    <div class="register">¿Sin registrarte aún? <RouterLink to="/main-register" style="color: #024955">Registrar</RouterLink></div>

    <p v-if="isError" style="color: red;">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useGlobalStore } from '@/stores/globalStore';
import { computed } from 'vue';


export default {
  components: {
    InputText,
    FloatLabel
  },
  setup() {
    const globalStore = useGlobalStore();
    const sharedVariable = computed(() => globalStore.sharedVariable);

    const clientLogged = () => {
      localStorage.setItem('typeUser', 'client');
      globalStore.setSharedVariable('client');

    };
    const supplierLogged = () => {
      localStorage.setItem('typeUser', 'supplier');
      globalStore.setSharedVariable('supplier');
  
    };

    const router = useRouter();
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const isError = ref(false);
    const typeUser = ref('');

    const login = () => {
      signInWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("USER logged in: ", user)

          // Create a user data object to store in localStorage
          const userData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            phoneNumber: user.phoneNumber,
            emailVerified: user.emailVerified,
          };

          // Store user data in localStorage
          localStorage.setItem('userData', JSON.stringify(userData));

          // Redirect to the home page
          if(typeUser.value == 'cliente') {
            clientLogged();
            router.push('/home');
          }
          else if(typeUser.value == 'proveedor') {
            supplierLogged();
            router.push('/homeProveedor');
          }
        })
        .catch((e) => {
          isError.value = true;
          switch (e.code) {
            case 'auth/invalid-email':
              errorMessage.value = 'Correo electrónico inválido';
              break;
            case 'auth/user-not-found':
              errorMessage.value = 'Usuario no encontrado';
              break;
            case 'auth/wrong-password':
              errorMessage.value = 'Contraseña incorrecta';
              break;
            default:
              errorMessage.value = 'Error al iniciar sesión';
              break;
          }
        });
    };

    return { email, password,typeUser, login, errorMessage, isError };
  }
}
</script>

<style>
.login-card {
  background-color: #C3EDF5;
  border-radius: 14px;
  padding: 20px;
  text-align: center;
  max-width: 400px;
  margin: auto;
  margin-top: 3%;
}

#logo {
  height: 105px;
  width: 198px;
  margin-bottom: 20px;
}

.login-title {
  font-size: 16px;
  margin-bottom: 30px;
}

.forgot-password {
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
