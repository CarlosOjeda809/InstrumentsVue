<script setup>
const { signup, errorMsg } = useAuth()
const router = useRouter()

const nombreUser = ref('')
const correoUser = ref('')
const contraseñaUser = ref('')

const insertarDatosUser = async () => {
  await signup(correoUser.value, contraseñaUser.value, nombreUser.value)

  nombreUser.value = ''
  correoUser.value = ''
  contraseñaUser.value = ''
  router.push('/login')

}


</script>

<template>
  <main class="flex items-center justify-center min-h-screen bg-gray-900 p-6">
    <section class="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-xl">

      <header>
        <h2
          class="text-3xl font-bold text-white mb-6 pb-3 text-center border-b-4 border-yellow-500 inline-block mx-auto">
          Registro
        </h2>
      </header>

      <form @submit.prevent="insertarDatosUser" class="flex flex-col space-y-5 mt-8">
        <input v-model="nombreUser" type="text" placeholder="Nombre"
          class="w-full p-3 bg-gray-700 text-white rounded-md border-2 border-gray-600 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition duration-200 placeholder-gray-400"
          :disabled="!signup" />
        <input v-model="correoUser" type="email" placeholder="Email"
          class="w-full p-3 bg-gray-700 text-white rounded-md border-2 border-gray-600 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition duration-200 placeholder-gray-400"
          :disabled="!signup" />
        <input v-model="contraseñaUser" type="password" placeholder="Password"
          class="w-full p-3 bg-gray-700 text-white rounded-md border-2 border-gray-600 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition duration-200 placeholder-gray-400"
          :disabled="!signup" />
        <button type="submit"
          class="w-full bg-yellow-500 text-gray-900 font-bold p-3 rounded-md hover:bg-yellow-400 cursor-pointer transition duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!nombreUser.trim() || !correoUser.trim() || !contraseñaUser.trim() || !signup"> Registrarse
        </button>

        <button type="button" @click="() => router.push('/login')"
          class="w-full bg-gray-700 text-white font-bold p-3 rounded-md hover:bg-gray-600 cursor-pointer transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
          Ir a Login
        </button>
      </form>

      <p v-if="errorMsg" class="text-red-500 text-center mt-4 font-medium">{{ errorMsg }}</p>
    </section>
  </main>
</template>