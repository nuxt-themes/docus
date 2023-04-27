import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  extends: '../',
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      }
    }
  },
  modules: ['@nuxtjs/plausible', '@nuxt/devtools'],
  components: [
    {
      prefix: '',
      path: resolve('./components/landing'),
      global: true
    },
  ],
})
