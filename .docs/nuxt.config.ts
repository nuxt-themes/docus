export default defineNuxtConfig({
  extends: '../',
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      }
    }
  },
  modules: ['@nuxtjs/plausible'],
  typescript: {
    includeWorkspace: true
  }
})
