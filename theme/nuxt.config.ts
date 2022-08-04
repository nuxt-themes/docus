import { fileURLToPath } from 'url'
import { defineNuxtConfig } from 'nuxt'
import { createResolver } from '@nuxt/kit'
import localModule from './app/module'

const { resolve } = createResolver(import.meta.url)

// TODO: refacto using Nuxt Studio Elements
const components = [
  {
    prefix: '',
    path: resolve('./components/app'),
    global: true,
  },
  {
    prefix: '',
    path: resolve('./components/docs'),
    global: true,
  },
  {
    prefix: '',
    path: resolve('./components/prose'),
    global: true,
  },
  {
    prefix: '',
    path: resolve('./components/content'),
    global: true,
  },
  {
    prefix: '',
    path: resolve('./components/github'),
    global: true,
  },
  {
    prefix: '',
    path: resolve('./components/icons'),
    global: true,
  },
]

export default defineNuxtConfig({
  metadata: {
    title: 'Docus'
  },
  appConfig: {

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
    /**
     * https://nuxt-theme-kit.netlify.app
     */
    // TODO: Remove this ignore
    // https://github.com/nuxt-themes/config/issues/5
    // @ts-ignore
    theme: {
      meta: {
        name: 'Docus 📃',
        description: 'The best place to start your documentation.',
        author: 'NuxtLabs',
      },
      theme: true,
      tokens: true,
    },
  },
  components,
  modules: [
    '@nuxt-themes/config/module',
    '@nuxtjs/design-tokens/module',
    '@nuxt/content',
    '@nuxthq/studio',
    localModule,
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
  ],
  tailwindcss: {
    viewer: false,
    cssPath: resolve('assets/css/main.css'),
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
  experimental: {
    viteNode: true
  }
})
