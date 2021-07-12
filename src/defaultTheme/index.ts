import { resolve } from 'path'
import { nuxtConfig } from 'nuxt-extend'
import type { NuxtConfig } from '@nuxt/types'
import themeSetupModule, { beforeBuildHook } from './module'

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
      class: ['d-body-bg d-body-text-color text-root min-w-base antialiased tracking-semitight d-scrollbar']
    }
  },
  colorMode: {
    classSuffix: ''
  },
  css: [r('./css/main.css'), r('./css/prism.css')],
  components: [
    /**
     * Atoms
     */
    {
      path: r('./components/atoms'),
      prefix: '',
      isAsync: false,
      level: 2
    },
    {
      path: r('./components/atoms/icons'),
      prefix: '',
      isAsync: false,
      level: 2
    },
    {
      path: r('./components/atoms/prose'),
      prefix: '',
      isAsync: false,
      level: 2
    },
    /**
     * Molecules
     */
    {
      path: r('./components/molecules'),
      prefix: '',
      isAsync: false,
      level: 2
    },
    /**
     * Organisms
     */
    {
      path: r('./components/organisms'),
      prefix: '',
      isAsync: false,
      level: 2
    },
    {
      path: r('./components/organisms/app'),
      prefix: '',
      isAsync: false,
      level: 2
    },
    {
      path: r('./components/organisms/blog'),
      prefix: '',
      isAsync: false,
      level: 2
    },
    {
      path: r('./components/organisms/dev-slots'),
      prefix: '',
      isAsync: false,
      level: 2
    },
    {
      path: r('./components/organisms/page'),
      prefix: '',
      isAsync: false,
      level: 2
    },
    {
      path: r('./components/organisms/slots'),
      prefix: '',
      isAsync: false,
      level: 2
    },
    /**
     * Templates
     */
    {
      path: r('./components/templates'),
      prefix: '',
      isAsync: false,
      level: 2
    }
  ],
  plugins: [r('./plugins/menu')],
  modules: [themeSetupModule, 'nuxt-windicss', '@nuxtjs/color-mode'],
  hooks: {
    build: {
      before: beforeBuildHook
    }
  }
})

export default themeConfig

export * from './index.d'
