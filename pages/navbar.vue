<script setup>

  const {
    user,
    email,
    userName,
    password,
    errorMsg,
    getUserName,
    signup,
    logout
   
  } = useAuth()


  
 
  onMounted(async () => {
  
  const stop = watch(
    () => user.value,
    async (u) => {
      if (u) {
        await getUserName()
        stop() 
      }
    },
    { immediate: true }
  )
})

</script>

<template>
  <header>
    <nav class="bg-gray-800 p-4">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
       <div @click="navigateTo('/')" class="flex items-center space-x-4  cursor-pointer">
        <div class="text-white text-xl font-bold">
          Innoarea Projects
        </div>
        <Icon name="material-symbols:eyeglasses" class="text-5xl text-white"></Icon>
      </div>
        <div class="flex items-center space-x-4">
          
          <button v-if="!user" @click="navigateTo('/login')" class="text-white bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md text-sm font-medium cursor-pointer">
            Iniciar sesión
          </button>
            <button v-if="user" @click="navigateTo('/profile')" class="text-white bg-yellow-600 hover:bg-yellow-800 px-4 py-2 rounded-md text-sm font-medium cursor-pointer capitalize">
            {{ userName }}
            </button>
        </div>
      </div>
    </nav>
  </header>
</template>
