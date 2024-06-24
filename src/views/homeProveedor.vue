<template>
  <div class="container">
    <h1>Dashboard</h1>
    <div class="containerCharts">
      <Chart type="line" :data="chartData" :options="chartOptions" class="h-20rem w-full" />
      <Chart type="doughnut" :data="chartData2" :options="chartOptions" class="h-20rem w-full"/>
    </div>

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
    <button class="logout-button" @click="logout()">Log Out</button>

  </div>
  </template>
  
  <script>
  import { getAuth, signOut } from 'firebase/auth';
  import { useRouter } from 'vue-router';
  import { ref, onMounted } from 'vue';
  import { useGlobalStore } from '@/stores/globalStore';
  import { computed } from 'vue';
  export default {
    
    setup() {
      const globalStore = useGlobalStore();
      const sharedVariable = computed(() => globalStore.sharedVariable);

      const userLogout = () => {
          globalStore.setSharedVariable('login');
      };
      const router = useRouter();
      const userData = ref(null);
      const products = ref([
        {
          id: 1,
          client: 'Cliente 1',
          serviceName: 'Luz Electrix',
          price: 100,
          status: 'Pendiente',
          action: 'Acción 1'
        },
        {
          id: 2,
          client: 'Cliente 2',
          serviceName: 'Luz H2O',
          price: 200,
          status: 'Pagado',
          action: 'Acción 2'
        },
        {
          id: 3,
          client: 'Cliente 3',
          serviceName: 'Luz Net',
          price: 300,
          status: 'Pendiente',
          action: 'Acción 3'
        },
      ]);
      const columns = [
          { field: 'client', header: 'Cliente' },
          { field: 'serviceName', header: 'Servicio adquirido' },
          { field: 'price', header: 'Monto' },
          { field: 'status', header: 'Estado' },
      ]; 

      const chartData = ref();
      const chartOptions = ref();
      const chartData2 = ref();
      const chartOptions2 = ref(null);

      const setChartData = () => {
        const documentStyle = getComputedStyle(document.documentElement);

        return {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--cyan-500'),
                    tension: 0.4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--gray-500'),
                    tension: 0.4
                }
            ]
        };
      };
      const setChartData2 = () => {
        const documentStyle = getComputedStyle(document.body);

        return {
            labels: ['A', 'B', 'C'],
            datasets: [
                {
                    data: [540, 325, 702],
                    backgroundColor: [documentStyle.getPropertyValue('--cyan-500'), documentStyle.getPropertyValue('--orange-500'), documentStyle.getPropertyValue('--gray-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--cyan-400'), documentStyle.getPropertyValue('--orange-400'), documentStyle.getPropertyValue('--gray-400')]
                }
            ]
        };
      };
      const setChartOptions = () => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        return {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };
      }

      const setChartOptions2 = () => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        return {
            plugins: {
                legend: {
                    labels: {
                        cutout: '60%',
                        color: textColor
                    }
                }
            }
        };
      };
      onMounted(() => {
        const storedUserData = JSON.parse(localStorage.getItem('userData'));
        if (storedUserData) {
          userData.value = storedUserData;
        } else {
          router.push('/');
        }
        chartData.value = setChartData();
        chartOptions.value = setChartOptions();
        chartData2.value = setChartData2();
        chartOptions2.value = setChartOptions2();
      });
  
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
  
      return { userData, logout, columns, products, showMore, chartData, chartOptions, setChartData, setChartOptions, chartData2, chartOptions2, setChartData2, setChartOptions2};
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
  .containerCharts{
    display: flex;
    justify-content: center;
    gap: 5rem;
    width: 100%;
    margin-bottom: 2rem;
  }
  </style>
  