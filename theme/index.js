import defu from 'defu'
import nuxtConfig from './nuxt.config'

const defaultConfig = docsOptions => nuxtConfig(docsOptions)

export default (userConfig) => {
  userConfig.docs = defu(userConfig.docs, {
    primaryColor: '#00CD81'
  })

  const config = defu.arrayFn(userConfig, defaultConfig(userConfig.docs))

  if (userConfig.env && userConfig.env.GITHUB_TOKEN) {
    // eslint-disable-next-line no-console
    console.warn('[security] Avoid passing `env.GITHUB_TOKEN` directly in `nuxt.config`. Use `.env` file instead!')
    userConfig.privateRuntimeConfig.GITHUB_TOKEN = userConfig.env.GITHUB_TOKEN
    delete userConfig.env.GITHUB_TOKEN
  }

  return config
}
