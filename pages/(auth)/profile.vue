<script setup>
import { profileActions } from '/composables/profileActions.js';
import { useAuth } from '/composables/auth.js';
const client = useSupabaseClient()

const {
    user,
    userName,
    errorMsg,
    getUserName,
    logout,
    updateUserName,
} = useAuth()

const {
    mostrarInputNombre,
    cambiarNombre,
    removeFavorite,
    fetchFavorites,
    mostrarCambioNombre,
    nuevoNombre,
    favoritosTabla
} = profileActions();

onMounted(async () => {
    if (user.value) {
        await getUserName()
        await fetchFavorites()
    }
})

const cerrarSesion = async () => {
    await logout()
}

</script>

<template>
    <main class="p-8 bg-[#333333] min-h-screen">
        <div
            class="flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-12 p-8 bg-[#1e1e1e] rounded-xl shadow-xl">

            <section class="flex-1 flex flex-col items-center md:items-start justify-start text-white">
                <header>
                    <h2
                        class="text-3xl font-bold mb-8 pb-3 text-center md:text-left border-b-4 border-yellow-500 inline-block">
                        Perfil de <span class="text-yellow-400">{{ userName }}</span></h2>
                </header>
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
                                class="bg-yellow-600  cursor-pointer text-gray-900 font-semibold px-6 py-2 rounded-md hover:bg-yellow-500 transition duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50">
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

                </div>
                <div class="flex justify-center md:justify-start mt-10 w-full">
                    <button @click="cerrarSesion"
                        class="bg-red-600 cursor-pointer text-white font-semibold px-8 py-3 rounded-md hover:bg-red-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50">
                        Cerrar sesión
                    </button>
                </div>
                <p v-if="errorMsg" class="text-red-500 mt-6 text-center w-full">{{ errorMsg }}</p>
            </section>

            <div class="hidden md:block border-r-2 border-gray-700"></div>
            <div class="md:hidden border-t-2 border-gray-700 pt-8 mt-8"></div>

            <section class="flex-1 h-full flex flex-col items-center md:items-start text-white">
                <header>
                    <h1
                        class="font-bold text-2xl text-center md:text-left text-white border-b-4 border-yellow-500 inline-block mb-8 pb-3">
                        INSTRUMENTOS FAVORITOS
                    </h1>
                </header>
                <div class="w-full max-h-[500px] overflow-y-auto pr-4">
                    <ul v-if="favoritosTabla && favoritosTabla.length > 0" class="space-y-4 w-full">
                        <li v-for="favorito in favoritosTabla" :key="favorito.intrumento?.id"
                            class="bg-gray-800 p-4 rounded-xl shadow-md border border-gray-700 text-white flex justify-between items-center">
                            <span class="flex-1 mr-4 text-lg">{{ favorito.intrumento?.name }} {{
                                favorito.intrumento?.emoji }}</span>
                            <icon name="material-symbols:delete"
                                class="text-red-500 hover:text-red-700 text-2xl cursor-pointer transition duration-200"
                                @click="() => removeFavorite(favorito.intrumento?.id)" title="Quitar de favoritos" />
                        </li>
                    </ul>
                    <p v-else class="text-center text-gray-400 mt-8">No tienes favoritos aún.</p>
                </div>
            </section>
        </div>
    </main>
</template>