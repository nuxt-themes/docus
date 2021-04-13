import type { NuxtConfig } from '@nuxt/types'
import defu from 'defu'

export function withDocus(userConfig: NuxtConfig): NuxtConfig {
  const nuxtConfig = require('./app/nuxt.config')

  const config = defu.arrayFn(userConfig, nuxtConfig)

  return config as NuxtConfig
}
