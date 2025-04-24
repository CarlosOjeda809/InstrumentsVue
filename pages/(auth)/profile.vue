    <script setup>




    const client = useSupabaseClient();

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
            await fetchFavorites();
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

        if (mostrarCambioPass.value) mostrarCambioNombre.value = false;
    }

    const mostrarInputNombre = () => {
        mostrarCambioNombre.value = !mostrarCambioNombre.value

        if (mostrarCambioNombre.value) mostrarCambioPass.value = false;
    }

    const cambiarPass = async () => {
        if (nuevaPass.value.trim()) {
            await updatePassword(nuevaPass.value.trim())
            nuevaPass.value = ''
            mostrarCambioPass.value = false

        }
    }

    const cambiarNombre = async () => {
        if (nuevoNombre.value.trim()) {
            await updateUserName(nuevoNombre.value.trim())
            nuevoNombre.value = ''
            mostrarCambioNombre.value = false

        }
    }

    const removeFavorite = async (instrumentId) => {
        const { error } = await client
            .from('favorites')
            .delete()
            .eq('users_id', user.value.id)
            .eq('instrumentos_id', instrumentId);

        if (error) {
            console.log(error)
            return
        }

        await fetchFavorites();
    };


    const fetchFavorites = async () => {
        const { data, error } = await client
            .from('favorites')
            .select(`intrumento: instrumentos_id (*)`)
            .eq('users_id', user.value.id);
        if (error) {
            console.log(error)
            ret
        }
        console.log(data)

        favoritosTabla.value = data


    }

    const cerrarSesion = async () => {
        await logout()
    }







</script>

<template>

    <!-- CONTENEDOR PRINCIPAL CON FLEX -->
    <div class="flex space-x-4 mx-auto mt-10 p-6 shadow-lg rounded-xl bg-white">

        <!-- PARTE DE ARRIBA (Centrada) -->
        <div class="flex-1 flex flex-col items-center justify-center">
            <h2 class="text-2xl font-bold mb-4 text-center">Perfil de {{ userName }}</h2>

            <div class="space-y-4 w-full">
                <div>
                    <div class="flex items-center justify-center space-x-2">
                        <label class="text-gray-600 font-medium">Nombre:</label>
                        <p class="text-md font-semibold text-gray-400">{{ userName }}</p>
                    </div>
                    <div class="flex justify-center">
                        <button @click="mostrarInputNombre"
                            class="mt-2 bg-blue-400 px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer text-white">
                            Cambiar nombre
                        </button>
                    </div>
                    <div v-if="mostrarCambioNombre" class="mt-3 flex justify-center">
                        <input v-model="nuevoNombre" type="text" class="w-full max-w-xs p-2 border rounded-md"
                            placeholder="Nuevo nombre" />
                        <button @click="cambiarNombre"
                            class="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 cursor-pointer">
                            Guardar nuevo nombre
                        </button>
                    </div>
                </div>

                <div class="flex justify-center">
                    <label class="text-gray-600 font-medium">Correo electrónico: </label>
                    <p class="text-md font-semibold text-gray-400 ml-1.5"> {{ user?.email }}</p>
                </div>

                <div class="flex items-center justify-center space-x-2">
                    <label class="text-gray-600 font-medium">Contraseña actual:</label>
                    <p class="text-md font-semibold text-gray-400">{{ userPass }}</p>
                </div>

                <div class="flex justify-center">
                    <button @click="mostrarInputCambio"
                        class="bg-blue-400 px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer text-white">
                        Cambiar contraseña
                    </button>
                </div>

                <div v-if="mostrarCambioPass" class="mt-3 flex justify-center">
                    <input v-model="nuevaPass" type="password" class="w-full max-w-xs p-2 border rounded-md"
                        placeholder="Nueva contraseña" />
                    <button @click="cambiarPass"
                        class="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 cursor-pointer">
                        Guardar nueva contraseña
                    </button>
                </div>
            </div>

            <div class="flex justify-center mt-4">
                <button @click="cerrarSesion"
                    class="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-600 cursor-pointer">
                    Cerrar sesión
                </button>
            </div>

            <p v-if="errorMsg" class="text-red-500 mt-4 text-center">{{ errorMsg }}</p>
        </div>

        <!-- SEPARADOR VERTICAL -->
        <div class="border-r-2 mx-4"></div>

        <!-- PARTE DE ABAJO -->
        <div class="flex-1 h-full">
            <h1 class="font-bold text-xl text-center">INSTRUMENTOS FAVORITOS</h1>
            <ul v-if="favoritosTabla.length > 0"
                class="flex-grow flex flex-col items-center overflow-y-auto capitalize">
                <li v-for="favorito in favoritosTabla" :key="favorito.intrumento.id"
                    class="shadow-sm bg-gray-100 p-2 mt-5 flex items-center justify-between w-full max-w-[400px]">
                    <span>{{ favorito.intrumento.name }} {{ favorito.intrumento.emoji }}</span>
                    <Icon name="material-symbols:delete" class="text-red-500 hover:text-red-700 text-xl cursor-pointer"
                        @click="() => removeFavorite(favorito.intrumento.id)" />
                </li>
            </ul>
            <p v-else class="text-center text-gray-500">No tienes favoritos aún.</p>

        </div>

    </div>

</template>
