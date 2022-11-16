export default defineNuxtConfig({
  extends: '../',
  modules: ['nuxt-plausible'],
  generate: {
    routes: ['/api/layouts']
  }
})
