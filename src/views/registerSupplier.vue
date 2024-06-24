<template>
    <div class="register-card">
      <div style="font-size: 40px; color: #024955; font-weight: bold; margin-bottom: 15px;">Registro del Proveedor</div>
      <div class="register-title" style="margin-bottom: 30px;">Crear una cuenta para acceder a EnergyXChain</div>
      <FloatLabel style="margin-bottom: 30px;">
        <InputText id="name" v-model="name" />
        <label for="name" class="input-label">Nombres</label>
      </FloatLabel>
      <FloatLabel style="margin-bottom: 30px;">
        <InputText id="phone" v-model="phone" />
        <label for="phone" class="input-label">Número Telefónico</label>
      </FloatLabel>
      <FloatLabel style="margin-bottom: 30px;">
        <InputText id="description" v-model="description" />
        <label for="description" class="input-label">Descripción</label>
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
  import { API_BASE_URL } from '@/config';
import Supplier from '../models/supplier.js';
  export default {
    components: {
      InputText,
      FloatLabel, 
      Checkbox
    },
    setup() {
      const router = useRouter();
      const id = ref(null);
      const uid = ref('');
      const name = ref('');
      const phone = ref('');
      const description = ref('');
      const email = ref('');
      const password = ref('');
      const plans = ref([]);
      const privacyTerms = ref(false);
      const isError = ref(false);
      const privacyTermsError = ref(false);

      const supplier = new Supplier(id, uid, email, name, phone, description, plans);
  
      const validateForm = () => {
        isError.value = false;
        privacyTermsError.value = false;
  
        if (!name.value || !phone.value || !description.value || !email.value || !password.value) {
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
            
            supplier.id = 0;
            supplier.uid = uid;
            supplier.name = name.value;
            supplier.phone = phone.value;
            supplier.description = description.value;
            supplier.email = email.value;
            supplier.plans = [];

           
            const res = await fetch(`${API_BASE_URL}supplier`, { // Usa la URL base
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ 
                //id: supplier.uid,
                uid: supplier.uid,
                name: supplier.name,
                phone: supplier.phone,
                description: supplier.description,
                email: supplier.email,
                plans: supplier.plans
                }) 
            });
            console.log(res, "Supplier creado satisfactoriamente")
               
            // Local Storage
            localStorage.setItem('userData', JSON.stringify(supplier));
            console.log(supplier);
  
            console.log('Usuario registrado', userCredential.supplier.uid);
  
            router.push('/home');
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
          });

      };
  
      return { name, phone, description, email, password, privacyTerms, register, isError, privacyTermsError,id,plans, supplier , uid};
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
  