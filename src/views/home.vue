<template  style="display: flex;">
    <div style="text-align: center; justify-content: center;">
        <button class="logout-button" @click="logout()">Log Out</button>
    
    </div>
</template>

<script>
    import { getAuth, signOut } from 'firebase/auth';
    import { useRouter } from 'vue-router'; 
    
    export default {
        
        setup() {
            const router = useRouter();
            const logout = () => {
                signOut(getAuth())
                    .then(() => {
                        console.log('Usuario deslogueado');
                        router.push('/');
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                
                
            };
            return { logout };
        }
    }
</script>

<style>
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
</style>