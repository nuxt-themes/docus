import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  modules: [
    'pinceau/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@vueuse/nuxt',
    resolve('./app/module')
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

  tailwindcss: {
    viewer: false,
    cssPath: resolve('assets/css/main.css')
  },

  pinceau: {
    configFileName: 'tokens.config'
  },

  content: {
    documentDriven: true,
    highlight: {
      theme: 'one-dark-pro',
      preload: ['json', 'js', 'ts', 'html', 'css', 'vue', 'diff', 'shell', 'markdown', 'yaml', 'bash', 'ini']
    },
    navigation: {
      fields: ['icon', 'titleTemplate']
    }
  },

  colorMode: {
    classSuffix: '',
    dataValue: 'theme'
  }
})
