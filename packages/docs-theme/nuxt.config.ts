import { fileURLToPath } from 'url'
import { defineNuxtConfig } from 'nuxt'
import { resolve } from 'pathe'
import tailwindConfig from './tailwind.config'
import { themeConfig } from './theme'

const themeDir = fileURLToPath(new URL('./', import.meta.url))
const resolveThemeDir = (path: string) => resolve(themeDir, path)

const components = [
  {
    prefix: '',
    path: './components/app',
    global: true,
  },
  {
    prefix: '',
    path: './components/docs',
    global: true,
  },
  {
    prefix: '',
    path: './components/prose',
    global: true,
  },
  {
    prefix: '',
    path: './components/content',
    global: true,
  },
  {
    prefix: '',
    path: './components/github',
    global: true,
  },
  {
    prefix: '',
    path: './components/icons',
    global: true,
  },
]

export default defineNuxtConfig({
  // Extends `docus/base`
  extends: [resolveThemeDir('../base')],

  /**
   * Docs theme configuration.
   *
   * Holds every configuration that applies to docs theme.
   */
  theme: themeConfig,

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

  modules: [resolveThemeDir('module.ts'), '@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],

  // @ts-expect-error - Broken TailwindCSS type
  tailwindcss: {
    viewer: false,
    cssPath: resolveThemeDir('assets/css/main.css'),
    config: {
      ...tailwindConfig,
      content: [
        resolveThemeDir('assets/**/*.{mjs,vue,js,ts}'),
        resolveThemeDir('components/**/*.{mjs,vue,js,ts}'),
        resolveThemeDir('layouts/**/*.{mjs,vue,js,ts}'),
        resolveThemeDir('pages/**/*.{mjs,vue,js,ts}'),
      ],
    },
  },

  content: {
    navigation: {
      fields: ['icon', 'aside'],
    },
  },

  colorMode: {
    classSuffix: '',
  },
})
