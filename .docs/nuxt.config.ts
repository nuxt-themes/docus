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
  modules: ['@nuxtjs/plausible', '@nuxt/devtools']
})
