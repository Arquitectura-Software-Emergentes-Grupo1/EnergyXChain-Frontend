<template>
    <div class="container">
        <h1>Ganancias</h1>

        <div class="card">
          <div class="text-align"><h2 >Total de revenuen:  </h2> <h3>200$</h3></div>
          
            <Chart type="bar" :data="chartData" :options="chartOptions" class="h-20rem"  />
        </div>
        <div class="card">
            <DataTable :value="products" stripedRows paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
              <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"></Column>
            </DataTable>
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
const chartData = ref();
const chartOptions = ref();


export default {
  
  setup() {
      const globalStore = useGlobalStore();
      const sharedVariable = computed(() => globalStore.sharedVariable);
      const user = JSON.parse(localStorage.getItem('userData'));
      const userId = ref();
      const userLogout = () => {
          localStorage.setItem('typeUser', 'login');
          globalStore.setSharedVariable('login');
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
        const data = await fetch(`${API_BASE_URL}api/v0/sale/supplier/${userId.value}`,{
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
        chartData.value = setChartData();
        chartOptions.value = setChartOptions();
      });
        
        
        const setChartData = () => {
            const documentStyle = getComputedStyle(document.documentElement);
        
            return {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'Profit',
                        backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
                        borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
                        data: [65, 59, 80, 81, 56, 55, 40]
                    },
                    {
                        label: 'Lost',
                        backgroundColor: documentStyle.getPropertyValue('--p-gray-500'),
                        borderColor: documentStyle.getPropertyValue('--p-gray-500'),
                        data: [28, 48, 40, 19, 86, 27, 90]
                    }
                ]
            };
        };
        const setChartOptions = () => {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--p-text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
            const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');
        
            return {
                maintainAspectRatio: false,
                aspectRatio: 0.8,
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
                            color: textColorSecondary,
                            font: {
                                weight: 500
                            }
                        },
                        grid: {
                            display: false,
                            drawBorder: false
                        }
                    },
                    y: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    }
                }
            };
        }
      const router = useRouter();  

      const products = ref([
        {
          id: 1,
          supplier: 'Proveedor 1',
          companyName: 'Empresa 1',
          monto: 100,
          fePago: '0/0/0'
        },
        {
          id: 2,
          supplier: 'Proveedor 2',
          companyName: 'Empresa 2',
          monto: 200,
          fePago: '0/0/0'
        },
        {
          id: 3,
          supplier: 'Proveedor 3',
          companyName: 'Empresa 3',
          monto: 300,
          fePago: '0/0/0'
        },
      ]);
      const columns = [
          { field: 'supplier', header: 'Proveedor' },
          { field: 'companyName', header: 'Nombre de la Empresa' },
          { field: 'monto', header: 'Monto' },
          { field: 'fePago', header: 'Fecha de Pago' },
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
      };
      
  
      return { logout, showMore, columns, products, router, chartData, chartOptions};
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
.text-align{
  display: flex;
  align-items: center;
  font-weight: 200;
}

.text-align h2{
  margin: 0;
  margin-right: 15px;
}
.text-align h3{
  margin-right: 5px;
  font-weight: 600;
  font-size: 2.5rem;
  margin: 0;
}
</style>
