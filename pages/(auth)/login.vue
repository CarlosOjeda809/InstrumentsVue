<script setup>
const { login, errorMsg, restablecerContraseña, loginConGoogle } = useAuth();
const email = ref('');
const password = ref('');
const router = useRouter();
const client = useSupabaseClient();
const config = useRuntimeConfig();

const iniciarSesion = async () => {
  await login(email.value, password.value);
};

</script>

<template>
  <main class="flex justify-center items-center bg-gray-900  h-full">
    <section class="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-xl">
      <h2 class="text-3xl font-bold text-white mb-6 pb-3 text-center border-b-4 border-yellow-500 inline-block mx-auto">
        Iniciar Sesión
      </h2>

      <form @submit.prevent="iniciarSesion" class="flex flex-col space-y-5 mt-8">
        <input v-model="email" type="email" placeholder="Email"
          class="w-full p-3 bg-gray-700 text-white rounded-md border-2 border-gray-600 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition duration-200 placeholder-gray-400" />

        <input v-model="password" type="password" placeholder="Password"
          class="w-full p-3 bg-gray-700 text-white rounded-md border-2 border-gray-600 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition duration-200 placeholder-gray-400" />

        <button type="submit"
          class="w-full bg-yellow-500 text-gray-900 font-bold p-3 rounded-md hover:bg-yellow-400 cursor-pointer transition duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50">
          Login
        </button>
        <button type="button" @click="loginConGoogle"
          class="w-full bg-yellow-700 text-gray-900 font-bold p-3 rounded-md hover:bg-yellow-900 cursor-pointer transition duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50">
          Ingresar con Google
        </button>

        <button type="button" @click="() => router.push('/register')"
          class="w-full bg-gray-700 text-white font-bold p-3 rounded-md hover:bg-gray-600 cursor-pointer transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
          Registro
        </button>
      </form>

      <a @click="restablecerContraseña(email)"
        class="block text-center font-semibold text-md text-yellow-500 cursor-pointer mt-4 hover:text-yellow-400 transition duration-200">
        Restablecer contraseña
      </a>

      <p v-if="errorMsg" class="text-red-500 text-center mt-4 font-medium">{{ errorMsg }}</p>
    </section>
  </main>
</template>
