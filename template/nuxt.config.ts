export default defineNuxtConfig({
  extends: '../theme',

  modules: ['@nuxtlabs/github-module'],

  github: {
    owner: 'nuxt',
    repo: 'content',
    branch: 'main'
  }
})
