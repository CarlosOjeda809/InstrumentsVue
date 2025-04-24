<script setup>
const config = useRuntimeConfig()
console.log(config.public.supabaseUrl)
console.log(config.public.supabaseAnonKey)

import { CRUD } from '@/composables/crud'

const {
    user,
    userName,
    getUserName,
} = useAuth()

const {
    instruments,
    instrumentName,
    instrumentEmoji,
    añadiendo,
    refreshInstruments,
    addInstrument,
    updateInstrument,
    deleteInstrument,
    toggleFavorite,
    rellenarInstrument,

} = CRUD()

onMounted(async () => {
    refreshInstruments()

    if (user.value) {
        await getUserName()
    }
})


</script>

<template>
    <div class="py-8 bg-[#333333]">
      <div class="mx-auto max-w-screen-xl p-6 bg-gray-900 rounded-lg shadow-xl">
  
        <h1 class="mb-6 pb-3 text-3xl font-extrabold capitalize text-white border-b-4 border-yellow-500 inline-block">
          Bienvenido, <span class="text-yellow-400">{{ userName }}</span>
        </h1>
  
        <p class="mb-6 text-xl font-semibold text-gray-300">
          Número total de instrumentos: <span class="text-yellow-400">{{ instruments.length }}</span>
        </p>
  
        <form @submit.prevent="añadiendo ? updateInstrument() : addInstrument()" class="space-y-4 p-6 flex flex-col">
          <input type="text" v-model="instrumentName" placeholder="Nombre del instrumento"
            class="p-3 bg-gray-700 text-white w-full rounded-md border border-gray-600 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition duration-200 placeholder-gray-400" />
          <input type="text" v-model="instrumentEmoji" placeholder="Emoji del instrumento (🎸)"
            class="p-3 bg-gray-700 text-white w-full rounded-md border border-gray-600 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition duration-200 placeholder-gray-400" />
  
          <button type="submit" :disabled="!instrumentName.trim() || !instrumentEmoji.trim()"
            class="bg-yellow-500 text-gray-900 font-bold p-3 w-full rounded-md hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50">
            {{ añadiendo ? 'Actualizar Instrumento' : 'Añadir Instrumento' }}
          </button>
        </form>
      </div>
    </div>
  
    <div class="py-8 bg-[#1e1e1e]">
      <div class="mx-auto max-w-screen-xl p-6 bg-gray-900 rounded-lg shadow-xl">
  
        <h2 class="text-2xl font-bold text-white border-b-4 border-yellow-500 inline-block mb-6 pb-3">Lista de Instrumentos</h2>
        <ul class="space-y-4 capitalize">
          <li v-for="instrument of instruments" :key="instrument.id"
              class="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 text-white flex justify-between items-center hover:bg-gray-700 transition duration-200">
              <span class="flex-1 mr-4 text-lg">{{ instrument.name }} {{ instrument.emoji }}</span>
  
              <div class="flex space-x-4 text-gray-400 text-xl">
                <Icon @click="() => deleteInstrument(instrument.id)" name="material-symbols:delete"
                    class="hover:text-red-500 cursor-pointer transition duration-200" title="Eliminar"></Icon>
                <Icon @click="() => rellenarInstrument(instrument)" name="material-symbols:edit"
                    class="hover:text-green-500 cursor-pointer transition duration-200" title="Editar"></Icon>
                <Icon
                    :name="instrument.is_favorite ? 'material-symbols:favorite' : 'material-symbols:favorite-outline'"
                    @click="() => toggleFavorite(instrument)"
                    :class="['cursor-pointer transition duration-200', instrument.is_favorite ? 'favorite-bounce text-yellow-500 hover:text-yellow-400' : 'text-gray-500 hover:text-yellow-500']"
                    :title="instrument.is_favorite ? 'Quitar de favoritos' : 'Añadir a favoritos'"
                     />
              </div>
          </li>
          <li v-if="!instruments || instruments.length === 0" class="text-center text-gray-500 mt-8">
             No hay instrumentos disponibles.
          </li>
        </ul>
      </div>
    </div>
  </template>