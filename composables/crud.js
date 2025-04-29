export function CRUD() {

    // IMPORTACIONES

    const client = useSupabaseClient()
    const user = useSupabaseUser()

    // VARIABLES REACTIVAS

    const instruments = ref([])
    const instrumentName = ref('')
    const instrumentEmoji = ref('')
    const instrumentId = ref(null)
    const añadiendo = ref(false)

    // CRUD INSTRUMENTOS


    const refreshInstruments = async () => {
        if (!user.value) return;

        const { data: instrumentsData, error: instrumentsError } = await client
            .from('instruments')
            .select()
            .eq('user_id', user.value.id);

        if (instrumentsError) {
            console.log(instrumentsError);
            return;
        }

        const { data: favoritesData, error: favoritesError } = await client
            .from('favorites')
            .select()
            .eq('users_id', user.value.id);

        if (favoritesError) {
            console.log(favoritesError);
            return;
        }

        instruments.value = instrumentsData.map(instrument => {
            const isFavorite = favoritesData?.some(fav => fav.instrumentos_id === instrument.id) || false;
            return { ...instrument, is_favorite: isFavorite };
        });
    };



    const addInstrument = async () => {
        if (!user.value) return

        const { data } = await client.from('instruments').insert([{
            name: instrumentName.value,
            emoji: instrumentEmoji.value,
            user_id: user.value.id,
        }]).select()

        if (data) {
            instruments.value.unshift(data[0])
            instrumentName.value = ''
            instrumentEmoji.value = ''
        }
    }

    const updateInstrument = async () => {
        await client.from('instruments').update({
            name: instrumentName.value,
            emoji: instrumentEmoji.value,
        }).eq('id', instrumentId.value)

        const instrument = instruments.value.find((i) => i.id === instrumentId.value)
        if (instrument) {
            instrument.name = instrumentName.value
            instrument.emoji = instrumentEmoji.value
        }

        instrumentName.value = ''
        instrumentEmoji.value = ''
        instrumentId.value = null
        añadiendo.value = false
    }

    const deleteInstrument = async (id) => {
        await client.from('instruments').delete().eq('id', id);
        instruments.value = instruments.value.filter(instrument => instrument.id !== id);
    };

    const rellenarInstrument = (instrument) => {
        instrumentName.value = instrument.name
        instrumentEmoji.value = instrument.emoji
        instrumentId.value = instrument.id
        añadiendo.value = true
    }

    // FUNCIONES PARA FAVORITOS


    const toggleFavorite = async (instrument) => {
        if (!user.value) return;

        const favoritoSi = instrument.is_favorite;

        if (favoritoSi) {
            await client
                .from('favorites')
                .delete()
                .eq('instrumentos_id', instrument.id)
                .eq('users_id', user.value.id);
            instrument.is_favorite = false;
        } else {
            await client.from('favorites').insert({
                instrumentos_id: instrument.id,
                users_id: user.value.id,
            });
            instrument.is_favorite = true;
        }

        await refreshInstruments();
    };




    return {
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

    }
}