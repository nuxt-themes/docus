import { fileURLToPath } from 'url'
import { defineNuxtConfig } from 'nuxt'
import { resolve } from 'pathe'

const themeDir = fileURLToPath(new URL('./', import.meta.url))
const resolveThemeDir = (path: string) => resolve(themeDir, path)

const components = [
  {
    prefix: '',
    path: resolveThemeDir('components'),
    global: true,
  },
]

export default defineNuxtConfig({
  /**
   * The base configuration.
   *
   * Holds most basic theme configurations that can be shared across any theme.
   */
  theme: {
    title: 'Docus',
    url: 'https://docus.dev',
    description: 'Write pages in markdown, use Vue components and enjoy the power of Nuxt with a blazing fast developer experience.',
    debug: false,
  },

  app: {
    head: {
      title: 'Docus',
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
        },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      ],
      meta: [
        { hid: 'og:site_name', property: 'og:site_name', content: 'Docus' },
        { hid: 'og:type', property: 'og:type', content: 'website' },
      ],
    },
  },

  components,

  content: {
    highlight: {
      theme: 'one-dark-pro',
      preload: ['json', 'js', 'ts', 'html', 'css', 'vue', 'diff', 'shell', 'markdown', 'yaml', 'bash', 'ini'],
    },
    navigation: {
      fields: ['layout'],
    },
    documentDriven: {
      injectPage: false
    },
  },

  modules: ['@nuxt/content', '@nuxthq/admin', 'nuxt-component-meta', '@vueuse/nuxt', resolveThemeDir('module')],
})
