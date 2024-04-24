// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss','nuxt-icon','@nuxt/test-utils/module'
  ],
  runtimeConfig: {

  },
  typescript: {
    typeCheck: true

  }

})
