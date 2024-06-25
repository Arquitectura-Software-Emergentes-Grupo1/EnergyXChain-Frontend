<template>
    <div class="card">
        <DataTable :value="products" stripedRows paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
          <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"></Column>
          <Column header="Acción">
            <template #body="slotProps">
                <Button @click="showMore(slotProps.data.id)" label="Ver más" style="background-color: #024955; border: #024955;" raised />
            </template>
          </Column>
        </DataTable>
    </div>
</template>

<script>

import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { API_BASE_URL } from '@/config';

export default {
  
    setup() {
      const router = useRouter();
      const user = JSON.parse(localStorage.getItem('userData'));
      const userId = ref();
      const products = ref([
        {
          id: 1,
          supplier: 'Proveedor 1',
          companyName: 'Empresa 1',
          monto: 100,
          feVenci: '0/0/0',
          action: 'Acción 1'
        },
        {
          id: 2,
          supplier: 'Proveedor 2',
          companyName: 'Empresa 2',
          monto: 200,
          feVenci: '0/0/0',
          action: 'Acción 2'
        },
        {
          id: 3,
          supplier: 'Proveedor 3',
          companyName: 'Empresa 3',
          monto: 300,
          feVenci: '0/0/0',
          action: 'Acción 3'
        },
      ]);
      const columns = [
          { field: 'supplier', header: 'Proveedor' },
          { field: 'companyName', header: 'Nombre de la Empresa' },
          { field: 'monto', header: 'Monto' },
          { field: 'feVenci', header: 'Fecha de Vencimiento' },
      ]; 



      const showMore = (id) => {
        console.log('Ver más', id);
      };
      const getUserId = async () => {
        const data = await fetch(`${API_BASE_URL}api/v0/customer/uid=${user.uid}`,{
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
        const data = await fetch(`${API_BASE_URL}api/v0/sale/customer/${userId.value}`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': true
          }
        });
        const jsonData = await data.json();

        console.log("PAGOS CLIENTE",jsonData);
        /* products.value = jsonData; */
      }
      
      onMounted(async () => {
        await getUserId()
        await getData()
      });
      return { router, columns, products, showMore};
  }
}
</script>

<style >
h1{
  color: black;
  text-align: center;
}
body{
  background-color: white !important;
}

</style>
