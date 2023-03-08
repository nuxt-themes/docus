export default defineNuxtConfig({
  extends: '../',
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
        // dir: 'rtl'
      }
    }
  },
  modules: ['nuxt-plausible'],
  typescript: {
    includeWorkspace: true
  }
})
