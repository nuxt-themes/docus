import defu from 'defu'
import nuxtConfig from './nuxt.config'

const defaultConfig = docusOptions => nuxtConfig(docusOptions)

export function withDocus (userConfig) {
  const config = defu.arrayFn(
    userConfig,
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
