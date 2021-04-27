import { resolve } from 'path'
import { nuxtConfig } from 'nuxt-extend'
import type { NuxtConfig } from '@nuxt/types'
import defu from 'defu'
import jiti from 'jiti'

const _require = jiti(__filename)

export function withDocus(userConfig: NuxtConfig, theme = undefined): NuxtConfig {
  const _config = _require('./app/nuxt.config')

  // Resolve Nuxt config from _require
  const _nuxtConfig = (_config.default || _config) as NuxtConfig

  if (theme) {
    // Theme specified, try to extend from its index
    _nuxtConfig.extends = theme
  }

  // Resolve theme path
  if (!_nuxtConfig.extends) {
    // No theme specified, load default one
    _nuxtConfig.extends = resolve(__dirname, './defaultTheme')
  }

  // Broadcast the currently used theme
  // eslint-disable-next-line no-console
  console.log('💄 Using Docus theme:')
  // eslint-disable-next-line no-console
  console.log(`💄 ${_nuxtConfig.extends}`)

  return nuxtConfig(defu.arrayFn(userConfig, _nuxtConfig))
}
