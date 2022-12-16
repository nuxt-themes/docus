export default defineNuxtConfig({
  extends: '../',
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      }
    }
  },
  modules: [
    'nuxt-plausible',
    '@unlighthouse/nuxt'
  ],
  typescript: {
    includeWorkspace: true
  }
})
