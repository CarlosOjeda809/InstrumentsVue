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

<!-- SECCION FORMULARIO -->
<div class="p-5 bg-[#333333]">
    <h1 class="p-3 text-2xl font-bold capitalize text-white border-b-2 border-yellow-500">Bienvenido, {{ userName }}</h1>
    <p class="p-3 text-xl font-bold flex text-gray-300">Número total de instrumentos: {{ instruments.length }}</p>
    <form @submit.prevent="añadiendo ? updateInstrument() : addInstrument()" class="space-y-2 p-3 flex flex-col">
        <input type="text" v-model="instrumentName" placeholder="Name" class="shadow-sm p-1.5 bg-gray-700 text-white w-full rounded-md border-2 border-gray-500">
        <input type="text" v-model="instrumentEmoji" placeholder="Emoji" class="shadow-sm p-1.5 bg-gray-700 text-white w-full rounded-md border-2 border-gray-500">
        <button type="submit" :disabled="!instrumentName.trim() || !instrumentEmoji.trim()"
            class="shadow-md bg-yellow-500 p-1.5 w-full text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer rounded-md">
            {{ añadiendo ? 'Actualizar' : 'Añadir' }}
        </button>
    </form>
</div>

<!-- SECCION LISTA INSTRUMENTOS -->
<div class="p-5 space-y-2 capitalize bg-[#1e1e1e]">
    <ul>
        <li v-for="instrument of instruments" :key="instrument.id"
            class="shadow-sm bg-gray-800 p-2 mt-2 rounded-xl border-2 border-gray-600 text-white">
            {{ instrument.id }}, {{ instrument.name }} {{ instrument.emoji }}
            <div class="flex space-x-2 mt-2 text-white">
                <Icon @click="() => deleteInstrument(instrument.id)" name="material-symbols:delete"
                    class="hover:text-red-500 cursor-pointer"></Icon>
                <Icon @click="() => rellenarInstrument(instrument)" name="material-symbols:edit"
                    class="hover:text-green-500 cursor-pointer"></Icon>
                <Icon
                    :name="instrument.is_favorite ? 'material-symbols:favorite' : 'material-symbols:favorite-outline'"
                    @click="() => toggleFavorite(instrument)"
                    :class="['hover:text-ywllow-500 cursor-pointer', instrument.is_favorite ? 'favorite-bounce text-yellow-500' : '']" />
            </div>
        </li>
    </ul>
</div>

</template>
