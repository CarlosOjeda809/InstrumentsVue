<script setup>
const { signup, errorMsg } = useAuth()
const router = useRouter()

const users = ref([])
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
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <div class="bg-white p-6 rounded-md shadow-xl w-full max-w-xl">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Registro</h2>
      <form @submit.prevent="insertarDatosUser" class="flex flex-col space-y-4">
        <input v-model="nombreUser" type="text" placeholder="Nombre"
          class="w-full p-3 border border-gray-300 rounded-md  " />
        <input v-model="correoUser" type="email" placeholder="Email"
          class="w-full p-3 border border-gray-300 rounded-md " />
        <input v-model="contraseñaUser" type="password" placeholder="Password"
          class="w-full p-3 border border-gray-300 rounded-md " />

        <button type="submit"
          class="w-full bg-green-500 text-white py-3 rounded-sm hover:bg-green-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" 
          :disabled="!nombreUser.trim() || !correoUser.trim() || !contraseñaUser.trim()">Registrarse</button>
        <button @click="navigateTo('/login')"
          class="w-full bg-blue-500 text-white py-3 rounded-sm hover:bg-blue-800 cursor-pointer"
          >
          Ir a Login
        </button>
      </form>

      <p class="text-red-500 text-center mt-4">{{ errorMsg }}</p>
    </div>
  </div>
</template>
