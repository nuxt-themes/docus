import { resolve } from 'path'
import { nuxtConfig } from 'nuxt-extend'
import type { NuxtConfig } from '@nuxt/types'
import themeSetupModule, { readyHook, beforeBuildHook } from './module'

const r = (...args: string[]) => resolve(__dirname, ...args)

const themeConfig: NuxtConfig = nuxtConfig({
  rootDir: __dirname,
  themeName: 'defaultTheme',
  themeDir: __dirname,
  head: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'
      },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' }
    ],
    bodyAttrs: {
      class: ['antialiased tracking-semitight text-gray-900 bg-red-500 dark:text-gray-50 dark:bg-gray-900']
    }
  },
  colorMode: {
    classSuffix: ''
  },
  css: [r('./css/main.css'), r('./css/prism.css')],
  components: [
    {
      path: r('./components/atoms'),
      global: true,
      level: 2
    },
    {
      path: r('./components/atoms/icons'),
      global: true,
      level: 2
    },
    {
      path: r('./components/molecules'),
      global: true,
      level: 2
    },
    {
      path: r('./components/organisms'),
      global: true,
      level: 2
    },
    {
      path: r('./components/organisms/slots'),
      global: true,
      level: 3
    },
    {
      path: r('./components/templates'),
      global: true,
      level: 3
    }
  ],
  plugins: [r('./plugins/menu')],
  modules: [themeSetupModule, 'nuxt-windicss', '@nuxtjs/color-mode'],
  hooks: {
    ready: readyHook,
    build: {
      before: beforeBuildHook
    }
  }
})

export default themeConfig

export * from './index.d'
