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
import { ref } from 'vue';

export default {
  
    setup() {
      const router = useRouter();

      const products = ref([
        {
          id: 1,
          supplier: 'Proveedor 1',
          companyName: 'Empresa 1',
          monto: 100,
          fePaga: '0/0/0',
          action: 'Acción 1'
        },
        {
          id: 2,
          supplier: 'Proveedor 2',
          companyName: 'Empresa 2',
          monto: 200,
          fePaga: '0/0/0',
          action: 'Acción 2'
        },
        {
          id: 3,
          supplier: 'Proveedor 3',
          companyName: 'Empresa 3',
          monto: 300,
          fePaga: '0/0/0',
          action: 'Acción 3'
        },
      ]);
      const columns = [
          { field: 'supplier', header: 'Proveedor' },
          { field: 'companyName', header: 'Nombre de la Empresa' },
          { field: 'monto', header: 'Monto' },
          { field: 'fePaga', header: 'Fecha Pagada' },
      ]; 



      const showMore = (id) => {
        console.log('Ver más', id);
      };
  
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
