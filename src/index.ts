import type { NuxtConfig } from '@nuxt/types'
import defu from 'defu'
import jiti from 'jiti'

const _require = jiti(__filename)

export function withDocus(userConfig: NuxtConfig): NuxtConfig {
  const _config = _require('./app/nuxt.config')
  const nuxtConfig = _config.default || _config

  const config = defu.arrayFn(userConfig, nuxtConfig)

  return config as NuxtConfig
}
