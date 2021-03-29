import { resolve, relative } from 'path'
import defu from 'defu'
import defaultWindiConfig from './windi.config'
import merge from 'lodash/merge'

export default function (nuxt) {
  const { hook, options } = nuxt

  hook('windicss:config', function (config) {
    const defaultExtractConfig = {
      extract: {
        dirs: [
          // add users src dir (docs)
          options.srcDir,
          // add theme folder (theme)
          __dirname,
          // add the content dir
          resolve(options.srcDir, options.publicRuntimeConfig.contentDir),
        ],
        exclude: [
          relative(options.windicss.root, resolve(options.srcDir, '.nuxt/**/*'))
        ]
      }
    }
    // merge default config with provided, this is a bit hacky because we need to keep the reference
    merge(defaultWindiConfig, defaultExtractConfig)
    merge(defaultWindiConfig, config)
    merge(config, defaultWindiConfig)

    // Workaround for typography plugin not being a function supporting theme
    if (typeof config.theme.extend.typography === 'function') {
      const defaultTheme = nuxt.resolver.requireModule('windicss/defaultTheme')
      const theme = (key) => {
        const keys = key.split('.')
        return keys.reduce((res, _key) => res[_key], defu(config.theme, defaultTheme))
      }
      config.theme.extend.typography = config.theme.extend.typography(theme)
    }
  })
}
