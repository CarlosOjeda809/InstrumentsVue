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
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <div class="bg-white p-6 rounded-md shadow-xl w-full max-w-md">
      <h2 class="text-2xl font-semibold text-center mb-4">Restablecer Contraseña</h2>
      
      <input v-model="newPass" type="password" placeholder="Nueva contraseña" class="w-full p-3 border border-gray-300 rounded-md mb-4" />
      <input v-model="confirmPass" type="password" placeholder="Confirmar contraseña" class="w-full p-3 border border-gray-300 rounded-md mb-4" />
      
      <button @click="cambiarContraseña" class="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-800">Guardar nueva contraseña</button>

      <p class="text-red-500 text-center mt-4">{{ errorMsg }}</p>
    </div>
  </div>
</template>
