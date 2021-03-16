import defu from 'defu'
import nuxtConfig from './nuxt.config'

function tryResolve (name) {
  try { return require.resolve(name) } catch { return false }
}

function detectCSSModule () {
  if (tryResolve('nuxt-windicss')) {
    return 'nuxt-windicss'
  }
  if (tryResolve('@nuxtjs/tailwindcss')) {
    return '@nuxtjs/tailwindcss'
  }
  throw new Error('Could not find `nuxt-windicss` or `@nuxtjs/tailwindcss`. Consider installing one of the packages.')
}

export function withDocus (userConfig) {
  const config = defu.arrayFn(
    userConfig,
    nuxtConfig
  )

  config.docusCSSModule = detectCSSModule()
  config.buildModules.push(config.docusCSSModule)

  if (userConfig.env && userConfig.env.GITHUB_TOKEN) {
    // eslint-disable-next-line no-console
    console.warn('[security] Avoid passing `env.GITHUB_TOKEN` directly in `nuxt.config`. Use `.env` file instead!')
    userConfig.privateRuntimeConfig.GITHUB_TOKEN = userConfig.env.GITHUB_TOKEN
    delete userConfig.env.GITHUB_TOKEN
  }

  return config
}
