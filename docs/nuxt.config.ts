import { defineNuxtConfig } from 'nuxt'

const theme = process.env.NODE_ENV === 'development' ? '../packages/docs-theme' : './node_modules/@docus/docs-theme'

export default defineNuxtConfig({
  extends: [theme],
  github: {
    owner: 'nuxt',
    repo: 'content',
  },
  theme: {},
})
