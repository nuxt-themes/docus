export default defineNuxtConfig({
  // https://github.com/nuxt-themes/docus
  extends: '@nuxt-themes/docus',

  modules: [
    // https://github.com/nuxt-modules/plausible
    '@nuxtjs/plausible',
    // https://github.com/nuxt/devtools
    '@nuxt/devtools',
    'nuxt-icon',
    '@nuxt/content'
  ],

  content: {
    // https://content.nuxtjs.org/api/configuration
    markdown: {
      tags: {
        p: ''
      },
    },
  },

  devtools: {
    enabled: true
  }
})
