<template>
  <div class="container">
    <h1>{{ proveedorData.name }}</h1>
    <div class="proveedorContainer">
      <div class="proveedorInfo">
        <p> <span style="font-weight: bold;">Empresa:</span> {{ proveedorData.companyName }}</p>
        <p> <span style="font-weight: bold;">Teléfono:</span> {{ proveedorData.cellphone }}</p>
        <p> <span style="font-weight: bold;">Precio:</span> {{ proveedorData.price }}</p>
        <p> <span style="font-weight: bold;">Correo:</span> {{ proveedorData.email }}</p>
      </div>
      <div class="proveedorCTA">
        <img src="../assets/img/proveedor.webp" style="border-radius: 50%; width: 250px;">
        <Button @click="hire()" label="Contratar" style="background-color: #024955; border: #024955; width: 70%;" raised />
      </div>
    </div>
    <div class="proveedorDesc">
        <p><span style="font-weight: bold;">Descripción:</span> </p>
        <p>{{ proveedorData.description }}</p>
      </div>
  </div>
  </template>
  
  <script>
  import { getAuth, signOut } from 'firebase/auth';
  import { useRouter } from 'vue-router';
  import { ref, onMounted } from 'vue';

  export default {
    
    setup() {
      const router = useRouter();
      const userData = ref(null);
      const proveedorData = ref(null);
      proveedorData.value = {
        id: 1,
        name: 'Electrix +',
        companyName: 'Empresa 1',
        cellphone: '987654321',
        price: 100,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tempor sapien nec leo luctus fermentum. Suspendisse eu scelerisque ipsum. Suspendisse at eleifend quam, vel rhoncus nisi. Ut laoreet risus nec mauris laoreet aliquam. Curabitur et rhoncus enim, vitae imperdiet augue. Sed non commodo elit. In dapibus congue velit ac semper. Donec vestibulum consequat libero, ac fermentum arcu laoreet id. Sed porta erat in ultricies porttitor. Duis commodo fringilla nisi, vitae convallis lorem interdum sit amet. Mauris tristique leo ut ligula dignissim, sit amet lacinia enim commodo. Quisque semper vehicula velit, in faucibus leo. Mauris pharetra felis a condimentum ornare',
        email: 'electrix@company.com'
      };
      console.log(proveedorData.value);
      onMounted(() => {
        const storedUserData = JSON.parse(localStorage.getItem('userData'));
        if (storedUserData) {
          userData.value = storedUserData;
        } else {
          router.push('/');
        }
        
      });
  
      const logout = () => {
        signOut(getAuth())
          .then(() => {
            console.log('Usuario deslogueado');
            localStorage.removeItem('userData');
            router.push('/');
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const hire = () => {
        router.push({ name: 'pagar'});
      };
  
      return { userData, logout, hire, proveedorData};
    }
  }
  </script>
  
  <style >
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
  h1{
    color: black;
    text-align: center;
  }
  body{
    background-color: white !important;
  }
  .proveedorInfo{
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 2rem;
    background-color: #C3EDF5;
    border-radius: 20px;
  }
  .proveedorDesc{
    display: flex;
    flex-direction: column;
    padding: 0 2rem;
    background-color: #C3EDF5;
    border-radius: 20px;
    margin-top: 2rem;
    height: 400px;
  }
  .proveedorCTA{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
  .proveedorContainer{
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 2rem;
    margin-top: 2rem;
  }
  </style>
  