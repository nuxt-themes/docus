import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  extends: ['../'],

  github: {
    owner: 'nuxtlabs',
    repo: 'docus',
    branch: 'dev',
  },

  buildModules: ['@nuxtlabs/github-module'],
})
