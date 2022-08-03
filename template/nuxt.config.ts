import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  extends: ['../theme'],

  github: {
    owner: 'nuxtlabs',
    repo: 'docus',
    branch: 'dev',
  },

  tailwindcss: {
    configPath: './tailwind.config.js',
  },

  modules: ['@nuxtlabs/github-module'],
})
