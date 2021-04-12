import type { NuxtConfig } from '@nuxt/types'
import defu from 'defu'
import nuxtConfig from './app/nuxt.config'

export function withDocus(userConfig: NuxtConfig): NuxtConfig {
  const config = defu.arrayFn(userConfig, nuxtConfig)

  return config as NuxtConfig
}
