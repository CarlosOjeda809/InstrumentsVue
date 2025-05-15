export function profileActions() {

    const mostrarCambioNombre = ref(false)
    const nuevoNombre = ref('')
    const favoritosTabla = ref([])
    const client = useSupabaseClient();
    const user = useSupabaseUser();
    const { updateUserName } = useAuth();


    const mostrarInputNombre = () => {
        mostrarCambioNombre.value = !mostrarCambioNombre.value
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
            .select('intrumento: instrumentos_id (*)')
            .eq('users_id', user.value.id)
        if (error) {
            console.log(error)
            return
        }
        console.log(data)

        favoritosTabla.value = data
    }

    return {
        mostrarInputNombre,
        cambiarNombre,
        removeFavorite,
        fetchFavorites,
        mostrarCambioNombre,
        nuevoNombre,
        favoritosTabla


    }
}