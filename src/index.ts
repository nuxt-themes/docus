import { nuxtConfig } from 'nuxt-extend'
import type { NuxtConfig } from '@nuxt/types'
import defu from 'defu'
import jiti from 'jiti'

const _require = jiti(__filename)

export function withDocus(userConfig: NuxtConfig): NuxtConfig {
  const _config = _require('./app/nuxt.config')

  const _nuxtConfig = (_config.default || _config) as NuxtConfig

  return nuxtConfig(defu.arrayFn(userConfig, _nuxtConfig))
}
