<script setup>

const { updatePassword, errorMsg } = useAuth()
const router = useRouter()

const newPass = ref('')
const confirmPass = ref('')

const cambiarContraseña = async () => {
  if (newPass.value !== confirmPass.value) {
    errorMsg.value = 'Las contraseñas no coinciden'
    return
  }

  await updatePassword(newPass.value)

  if (errorMsg.value.includes('éxito')) {
    setTimeout(() => {
      router.push('/login')
    }, 1000)
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-900 p-6">
    <div class="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md"> <h2 class="text-3xl font-bold text-white mb-6 pb-3 text-center border-b-4 border-yellow-500 inline-block mx-auto">
          Restablecer Contraseña
      </h2>

      <div class="flex flex-col space-y-5 mt-8"> <input v-model="newPass" type="password" placeholder="Nueva contraseña"
          class="w-full p-3 bg-gray-700 text-white rounded-md border-2 border-gray-600 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition duration-200 placeholder-gray-400" />

        <input v-model="confirmPass" type="password" placeholder="Confirmar contraseña"
          class="w-full p-3 bg-gray-700 text-white rounded-md border-2 border-gray-600 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition duration-200 placeholder-gray-400" />

        <button @click="cambiarContraseña"
          class="w-full bg-yellow-500 text-gray-900 font-bold p-3 rounded-md hover:bg-yellow-400 cursor-pointer transition duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50">
          Guardar nueva contraseña
        </button>
      </div>

      <p v-if="errorMsg" class="text-red-500 text-center mt-4 font-medium">{{ errorMsg }}</p>
    </div>
  </div>
</template>
