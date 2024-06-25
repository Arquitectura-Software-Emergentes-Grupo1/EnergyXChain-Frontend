<template>
    <div class="container">
      <h1>Mis Servicios</h1>
        <div class="card">
            <DataTable :value="products" stripedRows paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
              <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"></Column>
              <Column header="Acción">
                <template #body="slotProps">
                    <Button @click="showMore(slotProps.data.id)" label="Eliminar" style="background-color: #024955; border: #024955;" raised />
                </template>
              </Column>
            </DataTable>
            <div style="width: 100%; display: flex; justify-content: center; margin-top: 1rem;">
              <Button @click="addService()" label="Crear Servicio" style="background-color: #024955; border: #024955; padding: 1rem;" raised />
            </div>
        </div>

      <button class="logout-button" @click="logout()">Log Out</button>
  
    </div>
</template>

<script >
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useGlobalStore } from '@/stores/globalStore';
import { computed } from 'vue';
import { API_BASE_URL } from '@/config';

const pagos = ref(true);

export default {
  
  setup() {
      const globalStore = useGlobalStore();
      const sharedVariable = computed(() => globalStore.sharedVariable);
      const user = JSON.parse(localStorage.getItem('userData'));
      const userLogout = () => {
          localStorage.setItem('typeUser', 'login');
globalStore.setSharedVariable('login');
      };
      const userId = ref();
      const router = useRouter();  

      const products = ref([
        /* {
          id: 1,
          serviceName: 'Empresa 1',
          price: 100,
          description: 'lorem ipsum...',
          action: 'Acción 1'
        },
        {
          id: 2,
          serviceName: 'Empresa 2',
          price: 200,
          description: 'lorem ipsum...',
          action: 'Acción 2'
        },
        {
          id: 3,
          serviceName: 'Empresa 3',
          price: 300,
          description: 'lorem ipsum...',
          action: 'Acción 3'
        }, */
      ]);
      const columns = [
          { field: 'serviceName', header: 'Nombre del Servicio' },
          { field: 'price', header: 'Precio' },
          { field: 'description', header: 'Descripción' },
      ]; 


  
      const logout = () => {
        signOut(getAuth())
          .then(() => {
            console.log('Usuario deslogueado');
            localStorage.removeItem('userData');
            userLogout();
            router.push('/');
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const showMore = (id) => {
        console.log('Ver más', id);
        router.push({ name: 'proveedor-detail', params: { id } });

      };
      const addService = () => {
        router.push({ name: 'nuevo-servicio' });
      };

      const getUserId = async () => {
        const data = await fetch(`${API_BASE_URL}api/v0/supplier/uid=${user.uid}`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': true
          }
        });
        const jsonData = await data.json();

        console.log("USERID",jsonData);
        userId.value = jsonData.id;
      }
      const getData = async () => {
        //hacer fetch a endpoint de get servicios
        const data = await fetch(`${API_BASE_URL}api/v0/plan/supplier/${userId.value}`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': true
          }
        });
        const jsonData = await data.json();

        console.log("SERVICIOS DE SUPPLIER",jsonData);
        products.value = jsonData;
      }
      
      onMounted(async () => {
        await getUserId()
        await getData()

      });
      return { logout, showMore, addService, columns, products, router};
    },
    
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
.sectionPagos{
  display: flex;
  justify-content: center;
}
.sectionPagos button{
  border: 0;
  background-color: white;
  
}

.blue{
  color:#024955;
  font-weight: bold;
  font-size:x-large;
}
.noblue{
  font-weight: 400;
  font-size:x-large;
  color: black;
}



</style>
