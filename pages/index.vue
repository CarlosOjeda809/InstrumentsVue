<script setup>



const {
    user,
    email,
    userName,
    userPass,
    password,
    errorMsg,
    getUserName,
    getPassword,
    login,
    signup,
    logout
} = useAuth()

const {
    instruments,
    instrumentName,
    instrumentEmoji,
    instrumentId,
    añadiendo,
    refreshInstruments,
    addInstrument,
    updateInstrument,
    deleteInstrument,
    toggleFavorite,
    rellenarInstrument,
    getFavoritosLocalStorage,
} = CRUD()

const router = useRouter()

onMounted(async () => {
    refreshInstruments()
    const favoritosLocales = getFavoritosLocalStorage()
    instruments.value.forEach(instrument => {
        const encontrado = favoritosLocales.find(fav => fav.id === instrument.id)
        instrument.is_favorite = !!encontrado
    })

    if (user.value) {
        await getUserName()
    }
})


</script>

<template>

    <!-- SECCION FORMULARIO -->

    <div class="p-5">
        <h1 class="p-3 text-2xl font-bold flex capitalize">Bienvenido, {{ userName }}</h1>
        <p class="p-3 text-xl font-bold text-green-800 flex">Número total de instrumentos: {{ instruments.length }}</p>
        <form @submit.prevent="añadiendo ? updateInstrument() : addInstrument()" class="space-y-2 p-3 flex flex-col">
            <input type="text" v-model="instrumentName" placeholder="Name" class="shadow-sm p-1.5 bg-gray-100 w-full">
            <input type="text" v-model="instrumentEmoji" placeholder="Emoji" class="shadow-sm p-1.5 bg-gray-100 w-full">
            <button type="submit" :disabled="!instrumentName.trim() || !instrumentEmoji.trim()"
                class="shadow-md bg-gray-500 p-1.5 w-full text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                {{ añadiendo ? 'Actualizar' : 'Añadir' }}
            </button>
        </form>
    </div>

    <!-- SECCION LISTA INSTRUMENTOS -->

    <div class="p-5 space-y-2 capitalize rounded-md ml-3">
        <ul>
            <li v-for="instrument of instruments" :key="instrument.id" class="shadow-sm bg-gray-100 p-2 mt-2">
                {{ instrument.id }}, {{ instrument.name }} {{ instrument.emoji }}
                <div class="flex space-x-2 mt-2">
                    <Icon @click="() => deleteInstrument(instrument.id)" name="material-symbols:delete"
                        class="hover:text-red-500 cursor-pointer"></Icon>
                    <Icon @click="() => rellenarInstrument(instrument)" name="material-symbols:edit"
                        class="hover:text-green-500 cursor-pointer"></Icon>
                    <Icon
                        :name="instrument.is_favorite ? 'material-symbols:favorite' : 'material-symbols:favorite-outline'"
                        @click="() => toggleFavorite(instrument)" 
                        :class="['hover:text-red-500 cursor-pointer', instrument.is_favorite ? 'favorite-bounce text-red-500' : '']" />
                </div>
            </li>
        </ul>
    </div>

</template>
