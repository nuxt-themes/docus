import { resolve } from 'path'
import { nuxtConfig } from 'nuxt-extend'
import type { NuxtConfig } from '@nuxt/types'
import themeSetupModule, { readyHook, beforeBuildHook } from './module'

const r = (...args: string[]) => resolve(__dirname, ...args)

const themeConfig: NuxtConfig = nuxtConfig({
  name: 'defaultTheme',
  rootDir: __dirname,
  themeDir: __dirname,
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
