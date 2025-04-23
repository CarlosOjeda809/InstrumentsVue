
export default defineNuxtConfig({
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: undefined,
      exclude: ['/register', '/newpassword'],
      saveRedirectToCookie: false,
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/icon', '@nuxtjs/supabase'],
  css: ['~/assets/css/main.css'],
})