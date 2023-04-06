import { createResolver, logger, defineNuxtModule } from '@nuxt/kit'
import { $fetch } from 'ofetch'
import { version } from './package.json'

const { resolve } = createResolver(import.meta.url)

// That allows to overwrite these dependencies paths via `.env` for local development
const envModules = {
  studio: process?.env?.THEME_DEV_STUDIO_PATH || '@nuxthq/studio'
}

export default defineNuxtConfig({
  modules: [
    'pinceau/nuxt',
    envModules.studio,
    '@nuxtjs/color-mode',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-config-schema',
    'nuxt-icon',
    resolve('./app/module'),
    defineNuxtModule({
      meta: {
        name: '@nuxt-themes/docus'
      },
      setup (_, nuxt) {
        if (nuxt.options.dev) {
          $fetch('https://registry.npmjs.org/@nuxt-themes/docus/latest').then((release) => {
            if (release.version > version) {
              logger.info(`A new version of Docus (v${release.version}) is available: https://github.com/nuxt-themes/docus/releases/latest`)
            }
          }).catch((_) => {})
        }
      }
    })
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
      path: resolve('./components/prose'),
      global: true
    },
    {
      prefix: '',
      path: resolve('./components/elements/globals'),
      global: true
    },
    {
      prefix: '',
      path: resolve('./components/elements/icons'),
      global: true
    },
    {
      prefix: '',
      path: resolve('./components/elements/landing'),
      global: true
    }
  ],
  pinceau: {
    studio: true
  },
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
    dataValue: 'theme'
  }
})
