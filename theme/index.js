import defu from 'defu'
import nuxtConfig from './nuxt.config'
import { processUserConfig } from './utils/config'

const defaultConfig = docusOptions => nuxtConfig(docusOptions)

export function withDocus (userConfig) {
  userConfig.docus = defu(userConfig.docus, {
    colors: {
      primary: '#06B6D4',
      code: '#8B5CF6'
    }
  })

  const config = defu.arrayFn(
    processUserConfig(userConfig),
    defaultConfig(userConfig.docus)
  )

  if (userConfig.env && userConfig.env.GITHUB_TOKEN) {
    // eslint-disable-next-line no-console
    console.warn('[security] Avoid passing `env.GITHUB_TOKEN` directly in `nuxt.config`. Use `.env` file instead!')
    userConfig.privateRuntimeConfig.GITHUB_TOKEN = userConfig.env.GITHUB_TOKEN
    delete userConfig.env.GITHUB_TOKEN
  }

  return config
}
