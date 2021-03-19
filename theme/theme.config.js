import { resolve } from 'path'
import defu from 'defu'
import defaultWindiConfig from './windi.config'

export default function (nuxt) {
  const { hook, options } = nuxt

  hook('windicss:config', function (userConfig) {
    userConfig.config = defu.arrayFn(userConfig.config || {}, defaultWindiConfig)

    // include user content directory in scan process
    userConfig.scan.dirs.push(resolve(options.srcDir, options.publicRuntimeConfig.contentDir))

    // Workaround for typography plugin not being a function supporting theme
    if (typeof userConfig.config.theme.extend.typography === 'function') {
      const defaultTheme = nuxt.resolver.requireModule('windicss/defaultTheme')
      const theme = (key) => {
        const keys = key.split('.')
        return keys.reduce((res, _key) => res[_key], defu(userConfig.config.theme, defaultTheme))
      }
      userConfig.config.theme.extend.typography = userConfig.config.theme.extend.typography(theme)
    }
  })
}
