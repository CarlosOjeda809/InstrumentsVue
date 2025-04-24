<script setup>
const client = useSupabaseClient()
const passwordActual = ref('')

const {
    user,
    userName,
    userPass,
    errorMsg,
    getUserName,
    getPassword,
    logout,
    updatePassword,
    updateUserName,
} = useAuth()

const {
    getFavoritosLocalStorage,
    refreshInstruments,
} = CRUD()

onMounted(async () => {
    if (user.value) {
        await getUserName()
        await getPassword()
        refreshInstruments()
        await fetchFavorites()
    }
})

const favoritos = ref([])
const mostrarCambioPass = ref(false)
const nuevaPass = ref('')
const mostrarCambioNombre = ref(false)
const nuevoNombre = ref('')
const favoritosTabla = ref([])

const mostrarInputCambio = () => {
    mostrarCambioPass.value = !mostrarCambioPass.value

    if (mostrarCambioPass.value) mostrarCambioNombre.value = false
}

const mostrarInputNombre = () => {
    mostrarCambioNombre.value = !mostrarCambioNombre.value

    if (mostrarCambioNombre.value) mostrarCambioPass.value = false
}


const cambiarNombre = async () => {
    if (nuevoNombre.value.trim()) {
        await updateUserName(nuevoNombre.value.trim())
        nuevoNombre.value = ''
        mostrarCambioNombre.value = false
    }
}

const cambiarPass = async () => {
    if (!passwordActual.value.trim() || !nuevaPass.value.trim()) {
        errorMsg.value = 'Debes ingresar ambas contraseñas.'
        return
    }

    const { error: loginError } = await client.auth.signInWithPassword({
        email: user.value.email,
        password: passwordActual.value.trim(),
    })

    if (loginError) {
        errorMsg.value = 'La contraseña actual es incorrecta.'
        return
    }

    const { error } = await updatePassword(nuevaPass.value.trim())

    if (error) {
        errorMsg.value = 'Hubo un error al cambiar la contraseña.'
        return
    }

    passwordActual.value = ''
    nuevaPass.value = ''
    mostrarCambioPass.value = false

}

const removeFavorite = async (instrumentId) => {
    const { error } = await client
        .from('favorites')
        .delete()
        .eq('users_id', user.value.id)
        .eq('instrumentos_id', instrumentId)

    if (error) {
        console.log(error)
        return
    }

    await fetchFavorites()
}

const fetchFavorites = async () => {
    const { data, error } = await client
        .from('favorites')
        .select(`intrumento: instrumentos_id (*)`)
        .eq('users_id', user.value.id)
    if (error) {
        console.log(error)
        return
    }
    console.log(data)

    favoritosTabla.value = data
}

const cerrarSesion = async () => {
    await logout()
}

const mascaraContrasena = (contrasena) => {
    if (!contrasena) return ''
    const visible = contrasena.slice(-3)
    const oculto = '*'.repeat(contrasena.length - 3)
    return oculto + visible
}

</script>

<template>

    <!-- CONTENEDOR PRINCIPAL -->
    <div class="p-8 bg-[#333333] min-h-screen">

        <!-- CONTENEDOR DATOS -->

        <div
            class="flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-12 p-8 bg-[#1e1e1e] rounded-xl shadow-xl">

            <!-- PARTE DE LA IZQUIERDA -->

            <div class="flex-1 flex flex-col items-center md:items-start justify-start text-white">
                <h2
                    class="text-3xl font-bold mb-8 pb-3 text-center md:text-left border-b-4 border-yellow-500 inline-block">
                    Perfil de <span class="text-yellow-400">{{ userName }}</span></h2>
                <div class="space-y-6 w-full">
                    <div>
                        <div class="flex items-center justify-center md:justify-start space-x-3">
                            <label class="font-semibold text-gray-300">Nombre:</label>
                            <p class="text-lg font-medium text-white">{{ userName }}</p>
                        </div>
                        <div class="flex justify-center md:justify-start mt-3">
                            <button @click="mostrarInputNombre"
                                class="bg-yellow-500 cursor-pointer text-gray-900 font-semibold px-6 py-2 rounded-md hover:bg-yellow-400 transition duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50">
                                Cambiar nombre
                            </button>
                        </div>
                        <div v-if="mostrarCambioNombre"
                            class="mt-5 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <input v-model="nuevoNombre" type="text"
                                class="w-full max-w-xs p-3 border-2 border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition duration-200"
                                placeholder="Nuevo nombre" />
                            <button @click="cambiarNombre"
                                class="bg-yellow-600  cursor-pointer text-gray-900 font-semibold px-6 py-2 rounded-md hover:bg-yellow-500 transition duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50">
                                Guardar
                            </button>
                        </div>
                    </div>
                    <div>
                        <div class="flex items-center md:items-start flex-col space-x-3">
                            <label class=" font-semibold text-gray-300 ">Correo electrónico:</label>
                            <p class="text-lg font-medium text-white">{{ user?.email }}</p>
                        </div>
                    </div>

                    <div>
                        <div class="flex items-center justify-center md:justify-start space-x-3">
                            <label class="font-semibold text-gray-300">Contraseña:</label>
                            <p class="text-lg font-medium text-white">{{ mascaraContrasena(userPass) }}</p>
                        </div>
                    </div>

                    <div class="flex justify-center md:justify-start mt-3">
                        <button @click="mostrarInputCambio"
                            class="bg-yellow-500  text-gray-900 cursor-pointer font-semibold px-6 py-2 rounded-md hover:bg-yellow-400 transition duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50">
                            Cambiar contraseña
                        </button>
                    </div>

                    <div v-if="mostrarCambioPass"
                        class="mt-5 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 flex-wrap">

                        <input v-model="passwordActual" type="password"
                            class="w-full max-w-xs p-3 border-2 border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition duration-200"
                            placeholder="Contraseña actual" />

                        <input v-model="nuevaPass" type="password"
                            class="w-full max-w-xs p-3 border-2 border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition duration-200"
                            placeholder="Nueva contraseña" />

                        <button @click="cambiarPass"
                            class="bg-yellow-600 cursor-pointer text-gray-900 font-semibold px-6 py-2 rounded-md hover:bg-yellow-500 transition duration-200 ">
                            Guardar
                        </button>
                    </div>

                </div>
                <div class="flex justify-center md:justify-start mt-10 w-full">
                    <button @click="cerrarSesion"
                        class="bg-red-600 cursor-pointer text-white font-semibold px-8 py-3 rounded-md hover:bg-red-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50">
                        Cerrar sesión
                    </button>
                </div>
                <p v-if="errorMsg" class="text-red-500 mt-6 text-center w-full">{{ errorMsg }}</p>
            </div>
            <div class="hidden md:block border-r-2 border-gray-700"></div>
            <div class="md:hidden border-t-2 border-gray-700 pt-8 mt-8"></div>

            <!-- PARTE DE LA DERECHA -->

            <div class="flex-1 h-full flex flex-col items-center md:items-start text-white">
                <h1
                    class="font-bold text-2xl text-center md:text-left text-white border-b-4 border-yellow-500 inline-block mb-8 pb-3">
                    INSTRUMENTOS FAVORITOS
                </h1>
                <div class="w-full max-h-[500px] overflow-y-auto pr-4">
                    <ul v-if="favoritosTabla && favoritosTabla.length > 0" class="space-y-4 w-full">
                        <li v-for="favorito in favoritosTabla" :key="favorito.intrumento?.id"
                            class="bg-gray-800 p-4 rounded-xl shadow-md border border-gray-700 text-white flex justify-between items-center">
                            <span class="flex-1 mr-4 text-lg">{{ favorito.intrumento?.name }} {{
                                favorito.intrumento?.emoji }}</span>
                            <Icon name="material-symbols:delete"
                                class="text-red-500 hover:text-red-700 text-2xl cursor-pointer transition duration-200"
                                @click="() => removeFavorite(favorito.intrumento?.id)" title="Quitar de favoritos" />
                        </li>
                    </ul>
                    <p v-else class="text-center text-gray-400 mt-8">No tienes favoritos aún.</p>
                </div>
            </div>
        </div>
    </div>
</template>