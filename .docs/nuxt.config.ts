export default defineNuxtConfig({
  extends: '../',
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      }
    }
  },
  modules: ['nuxt-plausible'],
  typescript: {
    includeWorkspace: true
  }
})
