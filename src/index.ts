import type { NuxtConfig } from '@nuxt/types'
import defu from 'defu'

import jiti from 'jiti'
const _require = jiti(__filename, { interopDefault: true })

export function withDocus(userConfig: NuxtConfig): NuxtConfig {
  const nuxtConfig = _require('./app/nuxt.config')

  const config = defu.arrayFn(userConfig, nuxtConfig)

  return config as NuxtConfig
}
