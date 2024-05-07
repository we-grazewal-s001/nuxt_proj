// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss','nuxt-icon','@nuxt/test-utils/module'
  ],

  typescript: {
    typeCheck: true

  },
  runtimeConfig:{
    dbUrl:process.env.NUXT_DATABASE_URL
  },
  
})
