<template>
    <div>
        <nav class="nav-bar">
            <div class="nav-bar-content">
                <div class="logo">
                    <img class="logo_image" src='../assets/img/logo.png' alt="Logo">
                </div>
                <ul class="nav-links">
                    <li><router-link to="/">Iniciar Sesión</router-link></li>
                    <li><router-link to="/main-register">Registrarse</router-link></li>
                </ul>
            </div>
        </nav>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    /* Estilos del navbar */
    .nav-bar {
        background-color: transparent;
        width: 100%;
        z-index: 997;
        transition: all 0.3s ease;
        display: flex;
        justify-content: space-between;
        transition: all 0.6s ease;
        padding: .50rem;
        background: #C3EDF5;
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
</style>