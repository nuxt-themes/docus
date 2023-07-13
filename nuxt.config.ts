import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  extends: ['@nuxt-themes/typography'],

  modules: [
    '@nuxthq/studio',
    'pinceau/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/content',
    '@vueuse/nuxt',
    '@nuxt/devtools',
    'nuxt-icon',
    '@nuxtjs/plausible',
    '@nuxt/content',

    resolve('./app/module')
  ],

  css: [
    resolve('./assets/css/main.css')
  ],

  components: [
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
      path: resolve('./components/content'),
      global: true
    },
    {
      prefix: '',
      path: resolve('./components/icons'),
      global: true
    },
    {
      prefix: '',
      path: resolve('./components/landing'),
      global: true
    }
  ],

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
    },
    markdown: {
      tags: {
        p: ''
      },
    },
  },

  colorMode: {
    classSuffix: '',
    dataValue: 'theme'
  },
  devtools: {
    // Enable devtools (default: true)
    enabled: true,
    // VS Code Server options
    vscode: {},
    // ...other options
  }
})

function defineNuxtConfig(arg0: { extends: string[]; modules: string[]; css: string[]; components: { prefix: string; path: string; global: boolean }[]; pinceau: { configFileName: string }; content: { documentDriven: boolean; highlight: { theme: string; preload: string[] }; navigation: { fields: string[] }; markdown: { tags: { p: string } } }; colorMode: { classSuffix: string; dataValue: string }; devtools: { enabled: boolean } }) {
throw new Error('Function not implemented.')
}
