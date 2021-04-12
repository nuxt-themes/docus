import defu from 'defu'
import nuxtConfig from './nuxt.config'

export function withDocus(userConfig) {
  const config = defu.arrayFn(userConfig, nuxtConfig)

  return config
}
