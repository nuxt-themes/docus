import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  routeRules: {
    '/api/search': {
      prerender: true,
      cache: true
    }
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      }
    }
  },
  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    resolve('./app/module')
  ],
  css: [
    resolve('./assets/css/main.css')
  ],
  components: [
    {
      prefix: '',
      path: resolve('./components/layout'),
      global: true
    },
    {
      prefix: '',
      path: resolve('./components/icons'),
      global: true
    },
    {
      prefix: '',
      path: resolve('./components/elements'),
      global: true
    },
    // {
    //   prefix: '',
    //   path: resolve('./components/content'),
    //   global: true
    // },
    {
      prefix: '',
      path: resolve('./components/app'),
      global: true
    },
    {
      prefix: '',
      path: resolve('./components/docs'),
      global: true
    },
    {
      prefix: '',
      path: resolve('./components/landing'),
      global: true
    }
  ],
  content: {
    documentDriven: true,
    highlight: {
      theme: {
        dark: 'github-dark',
        default: 'github-light'
      },
      preload: ['json', 'js', 'ts', 'html', 'css', 'vue', 'diff', 'shell', 'markdown', 'yaml', 'bash', 'ini']
    },
    navigation: {
      fields: ['icon', 'titleTemplate', 'header', 'main', 'aside', 'footer']
    }
  },
  colorMode: {
    classSuffix: '',
    dataValue: 'theme',
    preference: 'dark'
  },
  typescript: {
    includeWorkspace: true
  },
})
