// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-09-09',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/google-fonts',],
  googleFonts: {
    display: 'swap',
    families: {
      'Roboto': [500, 700, 900],
    },
  },
})