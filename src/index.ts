import { resolve } from 'path'
import { nuxtConfig } from 'nuxt-extend'
import type { NuxtConfig } from '@nuxt/types'
import defu from 'defu'
import jiti from 'jiti'

const _require = jiti(__filename)

export function withDocus(userConfig: NuxtConfig, theme = undefined): NuxtConfig {
  const _config = _require('./app/nuxt.config')

  const _nuxtConfig = (_config.default || _config) as NuxtConfig

  // Resolve theme path
  if (!_nuxtConfig.extends && !theme) {
    // No theme specified, load default one
    _nuxtConfig.extends = resolve(__dirname, './defaultTheme')
  } else {
    // Theme specified, try to extend from its index
    _nuxtConfig.extends = theme
  }

  // Broadcast the currently used theme
  const pathSplit = _nuxtConfig.extends.split('/')
  // eslint-disable-next-line no-console
  console.log(`💄 Using Docus theme: ${pathSplit[pathSplit.length - 1]}`)

  return nuxtConfig(defu.arrayFn(userConfig, _nuxtConfig))
}
