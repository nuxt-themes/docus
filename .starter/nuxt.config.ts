export default defineNuxtConfig({
  extends: '..',
  compatibilityDate: '2024-10-23',
  devtools: { enabled: true },
  modules: [
    // Remove it if you don't use Plausible analytics
    // https://github.com/nuxt-modules/plausible
    '@nuxtjs/plausible'
  ]
})
