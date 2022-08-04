import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  extends: ['@nuxt-themes/docus'],
  modules: ['@nuxtlabs/github-module'],
  github: {
    // TODO: handle shortcut repository: 'nuxt-themes/docus#dev', see nuxtlabs/github-module#25
    owner: 'nuxt-themes',
    repo: 'docus',
    branch: 'dev',
  }
})
