<script setup>
const { login, errorMsg, restablecerContraseña } = useAuth();
const email = ref('');
const password = ref('');
const router = useRouter();

const iniciarSesion = async () => {
  await login(email.value, password.value); 
};
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-50">
    <div class="bg-white p-6 rounded-md shadow-xl w-full max-w-xl">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Iniciar Sesión</h2>
      <form @submit.prevent="iniciarSesion" class="flex flex-col space-y-3">
        <input v-model="email" type="email" placeholder="Email" class="w-full p-3 mb-4 border border-gray-300 rounded-md" />
        <input v-model="password" type="password" placeholder="Password" class="w-full p-3 mb-6 border border-gray-300 rounded-md" />
        
        <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-800 cursor-pointer ">Login</button>
        <button @click="() => router.push('/register')" class="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 cursor-pointer">Registro</button>
        
        <a @click="restablecerContraseña(email)" class="text-center font-semibold text-md text-blue-700 cursor-pointer">Restablecer contraseña</a>
      </form>
      
      <p class="text-red-500 text-center mt-4">{{ errorMsg }}</p>
    </div>
  </div>
</template>
