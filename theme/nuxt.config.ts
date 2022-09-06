import { defineNuxtConfig } from 'nuxt'
import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/design-tokens/module',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@vueuse/nuxt'
    // resolve('./app/module')
  ],
  css: [
    '@fontsource/inter/400.css',
    '@fontsource/inter/500.css',
    '@fontsource/inter/600.css',
    '@fontsource/inter/700.css'
  ],
  components: [
    {
      prefix: '',
      path: resolve('./components/prose'),
      global: true
    },
    {
      prefix: '',
      path: resolve('./components/github'),
      global: true
    },
    {
      prefix: '',
      path: resolve('./components/icons'),
      global: true
    },
    resolve('./components')

  ],
  app: {
    // TODO: Remove this ignore
    // https://github.com/nuxt-themes/config/issues/5
    // @ts-ignore
    theme: {
      meta: {
        name: 'Docus 📃',
        description: 'The best place to start your documentation.',
        author: 'NuxtLabs'
      }
    }
  },
  tailwindcss: {
    viewer: false,
    cssPath: resolve('assets/css/main.css')
  },
  content: {
    documentDriven: true,
    highlight: {
      theme: 'one-dark-pro',
      preload: ['json', 'js', 'ts', 'html', 'css', 'vue', 'diff', 'shell', 'markdown', 'yaml', 'bash', 'ini']
    },
    navigation: {
      fields: ['icon']
    }
  },
  colorMode: {
    classSuffix: ''
  }
})
