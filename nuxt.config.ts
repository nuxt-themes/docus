import { createResolver, logger } from '@nuxt/kit'
import { $fetch } from 'ofetch'
import { version } from './package.json'

logger.success(`Using Docus v${version}`)

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  extends: ['@nuxt-themes/typography'],

  modules: [
    '@nuxthq/studio',
    'pinceau/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/content',
    '@vueuse/nuxt',
    resolve('./app/module'),
    (_, nuxt) => {
      if (nuxt.options.dev) {
        $fetch('https://ungh.unjs.io/repos/nuxt-themes/docus/releases/latest').then(({ release }) => {
          if (release.tag !== `v${version}`) {
            logger.warn(`A new version of Docus (${release.tag}) is available: https://github.com/nuxt-themes/docus/releases/tag/${release.tag}`)
          }
        }).catch((_) => {})
      }
    }
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
    }
  },

  colorMode: {
    classSuffix: '',
    dataValue: 'theme'
  }
})
