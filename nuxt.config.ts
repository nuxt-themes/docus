import { fileURLToPath } from 'url'
import { defineNuxtConfig } from 'nuxt'
import { resolve } from 'pathe'
import localModule from './app/module'

const themeDir = fileURLToPath(new URL('./', import.meta.url))
const resolveThemeDir = (path: string) => resolve(themeDir, path)

const components = [
  {
    prefix: '',
    path: resolveThemeDir('./components/app'),
    global: true,
  },
  {
    prefix: '',
    path: resolveThemeDir('./components/docs'),
    global: true,
  },
  {
    prefix: '',
    path: resolveThemeDir('./components/prose'),
    global: true,
  },
  {
    prefix: '',
    path: resolveThemeDir('./components/content'),
    global: true,
  },
  {
    prefix: '',
    path: resolveThemeDir('./components/github'),
    global: true,
  },
  {
    prefix: '',
    path: resolveThemeDir('./components/icons'),
    global: true,
  },
]

export default defineNuxtConfig({
  /**
   * Docs theme configuration.
   *
   * Holds every configuration that applies to docs theme.
   */
  theme: {
    meta: {
      name: 'Docus 📃',
      description: 'The best place to start your documentation.',
      author: 'NuxtLabs',
    },
    theme: true,
    tokens: true,
  },

  app: {
    head: {
      title: 'Docus',
      link: [
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap',
        },
      ],
      meta: [
        { hid: 'og:site_name', property: 'og:site_name', content: 'Docus' },
        { hid: 'og:type', property: 'og:type', content: 'website' },
      ],
    },
  },

  components,

  modules: ['@nuxt-themes/config/module', '@nuxt/content', '@nuxthq/studio', localModule, '@vueuse/nuxt', '@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],

  tailwindcss: {
    viewer: false,
    cssPath: resolveThemeDir('app/css/main.css'),
    configPath: resolveThemeDir('app/tailwind.config.js'),
  },

  content: {
    highlight: {
      theme: 'one-dark-pro',
      preload: ['json', 'js', 'ts', 'html', 'css', 'vue', 'diff', 'shell', 'markdown', 'yaml', 'bash', 'ini'],
    },
    documentDriven: true,
    navigation: {
      fields: ['layout', 'icon', 'aside', 'toc', 'bottom', 'collapsed', 'navigation'],
    },
  },

  colorMode: {
    classSuffix: '',
  },
})
