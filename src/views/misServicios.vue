<template>
    <div class="container">
      <h1>Mis Servicios</h1>
        <div class="card">
            <DataTable :value="products" stripedRows paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
              <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"></Column>
              <Column header="Acción">
                <template #body="slotProps">
                    <Button @click="showMore(slotProps.data.id)" label="Ver más" style="background-color: #024955; border: #024955;" raised />
                    <Button @click="showMore(slotProps.data.id)" label="Eliminar" style="background-color: #024955; border: #024955; margin-left: 1rem;" raised />
                </template>
              </Column>
            </DataTable>
        </div>
      <button class="logout-button" @click="logout()">Log Out</button>
  
    </div>
</template>

<script >
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';


const pagos = ref(true);

export default {
  
  setup() {
      const router = useRouter();  

      const products = ref([
        {
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
        },
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
      
  
      return { logout, showMore, columns, products, router};
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
