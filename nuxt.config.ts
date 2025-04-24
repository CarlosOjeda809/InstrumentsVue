export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      supabaseUrl: 'https://jgzczkamdzvuvtjvwkqe.supabase.co',
      supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnemN6a2FtZHp2dXZ0anZ3a3FlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MTAwOTgsImV4cCI6MjA2MDM4NjA5OH0.lTgQ2GI1CJxwAvK30NTX-8ZJlZjbJIi1-es9lkZBRXk'
    }
  },
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: undefined,
      exclude: ['/register', '/newpassword'],
      saveRedirectToCookie: false
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/icon', '@nuxtjs/supabase'],
  css: ['~/assets/css/main.css']
})
