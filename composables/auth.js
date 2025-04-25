export function useAuth() {
  const client = useSupabaseClient()
  const user = useSupabaseUser()
  const errorMsg = ref('')
  const userName = ref('')

  const getUserName = async () => {
    if (user.value) {
      const { data, error } = await client
        .from('users')
        .select('Nombre')
        .eq('id', user.value.id)
        .single()

      if (error) {
        console.error('Error al obtener el nombre del usuario:', error)

      } else {
        userName.value = data.Nombre
      }
    }
  }

  const updateUserName = async (newUserName) => {
    if (!user.value) return;
    if (!newUserName || newUserName.trim() === '') {
      return;
    }


    const { data, error: updateError } = await client
      .from('users')
      .update({ Nombre: newUserName.trim() })
      .eq('id', user.value.id)
      .select('Nombre')
      .single();

    if (updateError) {
      errorMsg.value = 'Error al cambiar el nombre';
      console.error(updateError);
      return;
    }


    userName.value = data.Nombre;
    errorMsg.value = '¡Nombre actualizado con éxito!';
  };



  const login = async (email, password) => {
    const { error: authError } = await client.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      errorMsg.value = authError.message
    } else {

      navigateTo('/')
    }
  }

  const logout = async () => {
    const { error } = await client.auth.signOut();
    if (error) {
      errorMsg.value = error.message;
    } else {

      userName.value = '';
      errorMsg.value = '';


      navigateTo('/login');
    }
  }

  const restablecerContraseña = async (email) => {
    if (!email) {
      errorMsg.value = 'Introduce tu correo electrónico';
      return false;
    }

    const { error } = await client.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:3000/newpassword',
    });

    if (error) {
      errorMsg.value = error.message;
      return false;
    }

    errorMsg.value = 'Revisa tu correo para restablecer la contraseña';
    return true;
  };


  const signup = async (email, password, nombre) => {
    if (!email || !password || !nombre) {
      errorMsg.value = 'Rellena todos los campos';
      return false;
    }


    const { data, error: authError } = await client.auth.signUp({
      email,
      password,


    });

    if (authError) {
      console.error('Error al registrar en Supabase Auth:', authError);
      errorMsg.value = authError.message;
      return false;
    }

    const userId = data.user?.id;
    console.log('User ID:', userId);

    if (!userId) {

      errorMsg.value = 'No se pudo obtener el ID del usuario después del registro.';

      return false;
    }


    const { error: insertError } = await client.from('users').insert([
      {
        id: userId,
        Nombre: nombre,
        Correo: email,
      },
    ]);

    if (insertError) {
      console.error('Error al insertar en tabla users:', insertError);
      errorMsg.value = insertError.message;

      return false;
    }



    errorMsg.value = '¡Registro exitoso! Revisa tu correo para verificar tu cuenta.';
    return true;
  };


  return {
    user,
    userName,
    errorMsg,
    getUserName,
    login,
    signup,
    logout,
    updateUserName,
    restablecerContraseña
  }
}