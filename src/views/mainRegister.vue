<h1></h1><template>
    <div class="register-card">
      <div style="font-size: 40px; color: #024955; font-weight: bold; margin-bottom: 15px;">Registro</div>
      <div class="register-title" style="margin-bottom: 30px;">Crear una cuenta para acceder a EnergyXChain, elige el tipo de usuario a registrar. </div>
      <button class="register-button" style="margin-bottom: 15px; margin-right: 15px;" @click="goToScreenCustomerRegister()">Cliente</button>
      <button class="register-button" style="margin-bottom: 15px;" @click="goToScreenSupplierRegister()">Proveedor</button>

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
      const typeUser = ref('');
      const email = ref('');
      const password = ref('');
      const privacyTerms = ref(false);
      const isError = ref(false);
      const privacyTermsError = ref(false);
  
      const validateForm = () => {
        isError.value = false;
        privacyTermsError.value = false;
  
        if (!name.value || !phoneNumber.value || !age.value || !typeUser.value || !email.value || !password.value) {
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
            
            user.uid = uid;
            user.name = name.value;
            user.phoneNumber = phoneNumber.value;
            user.age = age.value;
            user.typeUser = typeUser.value;
            user.email = email.value;
           
            const res = await fetch(`${API_BASE_URL}supplier`, { // Usa la URL base
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ 
                email: user.email,
                password: password.value,
                name: user.name,
                description: "Prueba",
                phone: user.phoneNumber,
                }) 
            });
            console.log(res, "creado")
               
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

      const goToScreenCustomerRegister = () => {
        router.push('/register-customer');
        };

        const goToScreenSupplierRegister = () => {
        router.push('/register-supplier');
        };
  
      return { name, phoneNumber, age, typeUser, email, password, privacyTerms, register, isError, privacyTermsError, goToScreenCustomerRegister, goToScreenSupplierRegister };
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
    margin-top: 12%;
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
  
  </style>
  