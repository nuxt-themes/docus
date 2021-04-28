import { resolve } from 'path'
import { nuxtConfig } from 'nuxt-extend'
import type { NuxtConfig } from '@nuxt/types'
import defu from 'defu'
import jiti from 'jiti'

const _require = jiti(__filename)

export function withDocus(theme: string | NuxtConfig, userConfig: NuxtConfig): NuxtConfig {
  if (typeof theme !== 'string') {
    userConfig = theme
    theme = resolve(__dirname, './defaultTheme')
  } else {
    try {
      _require(theme)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(`Could not load Docus theme \`${theme}\``)
      process.exit(1)
    }
  }
  const _config = _require('./app/nuxt.config')

  // Resolve Nuxt config from _require
  const _nuxtConfig = (_config.default || _config) as NuxtConfig

  // Theme specified, try to extend from its index
  _nuxtConfig.extends = theme

  // Broadcast the currently used theme
  // eslint-disable-next-line no-console
  console.log('💄 Using Docus theme:')
  // eslint-disable-next-line no-console
  console.log(`💄 ${_nuxtConfig.extends}`)

  return nuxtConfig(defu.arrayFn(userConfig, _nuxtConfig))
}
