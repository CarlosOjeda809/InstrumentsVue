<script setup>

const {
  user,
  userName,
  getUserName,
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
  <header class="bg-gray-800 shadow-lg">
    <nav class="p-4">
      <div class="max-w-7xl mx-auto flex items-center justify-between">

        <router-link to="/" class="flex items-center space-x-3 cursor-pointer group">
          <h1 class="text-white text-xl font-bold group-hover:text-yellow-400 transition duration-200">
            Carlos Ojeda
          </h1>
          <icon name="material-symbols:music-note"
                class="text-4xl text-white group-hover:text-yellow-400 transition duration-200"></icon>
        </router-link>

        <div class="flex items-center space-x-4">
          <button v-if="!user" @click="navigateTo('/login')"
                  class="text-white bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
            Iniciar sesión
          </button>

          <router-link v-if="user" to="/profile"
                       class="bg-yellow-500 text-gray-900 hover:bg-yellow-400 font-bold px-4 py-2 rounded-md text-sm cursor-pointer capitalize transition duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50">
            {{ userName }}
          </router-link>
        </div>
      </div>
    </nav>
  </header>
</template>