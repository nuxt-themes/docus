import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  extends: ['../'],

  github: {
    owner: 'nuxtlabs',
    repo: 'docus',
    branch: 'dev',
  },

  modules: ['@nuxtlabs/github-module'],
})
