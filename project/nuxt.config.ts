// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss','nuxt-icon','@nuxt/test-utils/module','@builder.io/sdk-vue/nuxt'
  ],

  typescript: {
    typeCheck: true

  },
  runtimeConfig:{
    dbUrl:process.env.NUXT_DATABASE_URL,
    public: {
      builderApiKey: process.env.NUXT_PUBLIC_BUILDER_API_KEY
    }
  },
  
})
