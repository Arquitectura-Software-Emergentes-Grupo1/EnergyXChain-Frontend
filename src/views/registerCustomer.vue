<template>
    <div class="register-card">
      <div style="font-size: 40px; color: #024955; font-weight: bold; margin-bottom: 15px;">Registro del Cliente</div>
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
        <InputText id="email" v-model="email" />
        <label for="email" class="input-label">Correo Electrónico</label>
      </FloatLabel>
      <FloatLabel style="margin-bottom: 30px;">
        <InputText id="password" v-model="password" :type="'password'"/>
        <label for="password" class="input-label">Contraseña</label>
      </FloatLabel>
      
      <Checkbox v-model="privacyTerms" inputId="privacyTerms" name="privacyTerms" value="privacyTerms" />
      <label for="privacyTerms" class="ml-2"> Acepto los Términos y Condiciones de EnergyXChain </label>
      <p v-if="privacyTermsError" style="color: red;">Debe aceptar los términos y condiciones.</p>
  
      <button class="register-button" style="margin-bottom: 15px;" @click="register()">Registrarse</button>
      <div style="font-size: 15px;">¿Ya eres usuario? <RouterLink to="/" style="color:#024955">Iniciar Sesión</RouterLink></div>
      <p v-if="isError" style="color: red;">Por favor complete todos los campos.</p>
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

  import customer from '../models/customer.js';

  import { API_BASE_URL } from '@/config';

  export default {
    components: {
      InputText,
      FloatLabel, 
      Checkbox
    },
    setup() {
      const router = useRouter();
      const name = ref('');
      const phoneNumber = ref('');
      const age = ref('');
      const email = ref('');
      const password = ref('');
      const privacyTerms = ref(false);
      const isError = ref(false);
      const privacyTermsError = ref(false);
  
      const validateForm = () => {
        isError.value = false;
        privacyTermsError.value = false;
  
        if ( !name.value || !phoneNumber.value || !age.value || !email.value || !password.value) {
          isError.value = true;
        }
  
        if (!privacyTerms.value) {
          privacyTermsError.value = true;
        }
  
        return !isError.value && !privacyTermsError.value;
      };
  
      const register = async () => {
        // Validar todos los campos antes de registrar al usuario
        if (!validateForm()) {
          return;
        }
  
        createUserWithEmailAndPassword(getAuth(), email.value, password.value)
          .then( async (userCredential) => {
            const uid = userCredential.user.uid;
            
            customer.uid = uid;
            customer.name = name.value;
            customer.phoneNumber = phoneNumber.value;
            customer.age = age.value;
            customer.email = email.value;
           
            const res = await fetch(`${API_BASE_URL}customer`, { // Usa la URL base
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ 
                uid: customer.uid,
                email: customer.email,
                name: customer.name,
                phoneNumber: customer.phoneNumber,
                age: customer.age
                }) 
            });
            console.log(res, "Customer creado")
               
            // Local Storage
            localStorage.setItem('userData', JSON.stringify(user));
            console.log(user);
  
            console.log('Usuario registrado', userCredential.user.uid);
  
            router.push('/home');
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
          });
      };
  
      return { name, phoneNumber, age, email, password, privacyTerms, register, isError, privacyTermsError };
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
  