import { defineNuxtConfig } from 'nuxt'

const theme = process.env.NODE_ENV === 'development' ? '../packages/docs-theme' : './node_modules/@docus/docs-theme'

export default defineNuxtConfig({
  extends: [theme],

  github: {
    owner: 'nuxtlabs',
    repo: 'docus',
    branch: 'dev',
  },

  theme: {},

  modules: ['@docus/github' /* , '@nuxtjs/algolia' */],

  /*
  algolia: {
    applicationId: '1V8G7N9GF0',
    apiKey: '60a01900a4b726d667eab75b6f337592',
    docSearch: {
      indexName: 'nuxtjs',
      // @ts-expect-error - ?
      facetFilters: ['tags:v3'],
    },
  },
  */
})
