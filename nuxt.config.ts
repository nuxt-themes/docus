import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  extends: ['./packages/theme'],
  github: {
    repo: 'nuxt/content',
  },
})
