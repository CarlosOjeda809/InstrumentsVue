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
      const { data } = await client.from('instruments').select()
      instruments.value = data
      
      updateFavoriteStatus()
  }

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
      await client.from('instruments').delete().eq('id', id)
      await refreshInstruments()
  }

  const rellenarInstrument = (instrument) => {
      instrumentName.value = instrument.name
      instrumentEmoji.value = instrument.emoji
      instrumentId.value = instrument.id
      añadiendo.value = true
  }

  // FUNCIONES PARA FAVORITOS

  const toggleFavorite = async (instrument) => {
      instrument.is_favorite = !instrument.is_favorite

     

      updateLocalFavorites(instrument)
  }

  const updateFavoriteStatus = () => {
      const favoritos = getFavoritosLocalStorage()

      instruments.value.forEach(instrument => {
          const isFavorite = favoritos.some(fav => fav.id === instrument.id)
          instrument.is_favorite = isFavorite
      })
  }

  function updateLocalFavorites(instrument) {
      const favoritos = JSON.parse(localStorage.getItem('favoritos')) || []
      const existe = favoritos.find(fav => fav.id === instrument.id)

      if (instrument.is_favorite && !existe) {
          favoritos.push(instrument)
      } else if (!instrument.is_favorite && existe) {
          const nuevosFavoritos = favoritos.filter(fav => fav.id !== instrument.id)
          localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos))
          return
      }

      localStorage.setItem('favoritos', JSON.stringify(favoritos))
  }

  const getFavoritosLocalStorage = () => {
      return JSON.parse(localStorage.getItem('favoritos')) || []
  }

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
      getFavoritosLocalStorage,
      updateLocalFavorites,
  }
}
