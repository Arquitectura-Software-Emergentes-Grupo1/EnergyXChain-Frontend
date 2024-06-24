<template>
    <div>
        <nav class="nav-bar">
            <div class="nav-bar-content">
                <div class="logo">
                    <img class="logo_image" src='../assets/img/logo.png' alt="Logo">
                </div>
                <ul class="nav-links">
                    <li><router-link to="/homeProveedor">Dashboard</router-link></li>
                    <li><router-link to="/servicios">Servicios</router-link></li>
                    <li><router-link to="/my-clients">Clientes</router-link></li>
                    <li><router-link to="/ganancias">Ganancias</router-link></li>
                    <li><router-link to="/profile-supplier" style="display: flex; flex-direction: row; gap: .5rem; align-items: center;"><img src="../assets/img/userIcon.png" class="userIcon"><p>Perfil</p></router-link></li>
                </ul>
            </div>
        </nav>
    </div>
</template>
<script setup>
 import { useRouter } from 'vue-router';
 import { ref, onMounted } from 'vue';

 const userData = ref(null);
onMounted(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (storedUserData) {
        userData.value = storedUserData;
        console.log(userData.value);
    }
});
</script>
<style scoped>
    /* Estilos del navbar */
    .nav-bar {
        width: 100%;
        z-index: 997;
        transition: all 0.3s ease;
        display: flex;
        justify-content: space-between;
        transition: all 0.6s ease;
        padding: .50rem;
        background-color: #C3EDF5;
    }
    .nav-bar-content {
        display: flex;
        justify-content: space-between;
        transition: all 0.6s ease;
        width: 68%;
        margin: 0 auto;

    }
    .router-link-active {
        font-weight: bold;
    }
    .logo{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .logo img {
        height: 50px;
        width: auto;
        margin: 5px;
    }
    .nav-links {
        display: flex;
        list-style-type: none;
        margin: 0;
        padding: 0;
        align-items: center;
    }
    .nav-links li a {
        display: block;
        color: black;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
        transition: font-size 0.3s ease;
    }
    .nav-links li a:hover {
        font-size: 105%;
        transition: font-size 0.3s ease;
    }
    .userIcon{
        height: 40px;
        width: auto;
        border: 1.5px solid black;
        border-radius: 50%;
    }
</style>