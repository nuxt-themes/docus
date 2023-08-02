export default defineNuxtConfig({
  // https://github.com/nuxt-themes/docus
  extends: '@nuxt-themes/docus',

  modules: [
    // https://github.com/nuxt-modules/plausible
    '@nuxtjs/plausible',
    // https://github.com/nuxt/devtools
    '@nuxt/devtools'
  ],
  runtimeConfig: {
    public: {
      algolia: {
        applicationId: 'Q46Q8609QS',
        apiKey: '1661c72375532f074aedd9452a1270be',
        langAttribute: 'lang',
        docSearch: {
          indexName: 'content-nuxtjs'
        }
      }
    }
  }
})
