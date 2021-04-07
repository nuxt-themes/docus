import defu from 'defu'
import type { NuxtConfig } from '@nuxt/types'

import nuxtConfig from './theme/nuxt.config.js'

export function withDocus(userConfig: NuxtConfig): NuxtConfig {
  const config = defu.arrayFn(userConfig, nuxtConfig)

  if (userConfig.env && userConfig.env.GITHUB_TOKEN) {
    // eslint-disable-next-line no-console
    console.warn('[security] Avoid passing `env.GITHUB_TOKEN` directly in `nuxt.config`. Use `.env` file instead!')
    ;(userConfig.privateRuntimeConfig as any).GITHUB_TOKEN = userConfig.env.GITHUB_TOKEN
    delete userConfig.env.GITHUB_TOKEN
  }

  return config as NuxtConfig
}
