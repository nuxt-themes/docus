import { resolve } from 'path'
import defu from 'defu'
import defaultWindiConfig from './windi.config'
const r = path => resolve(__dirname, path)

export default function (nuxt) {
  const { hook, options } = nuxt

  hook('windicss:options', function (windiOptions) {
    // avoid duplicate scans on re-parse
    if (windiOptions.__docuResolved) {
      return
    }
    // include user content directory in scan process
    windiOptions.scanOptions.dirs.push(
      r('components/'),
      r('layouts/'),
      r('pages/'),
      r('plugins/'),
      r('utils/'),
      resolve(options.srcDir, options.publicRuntimeConfig.contentDir)
    )
    windiOptions.scanOptions.include = windiOptions.scanOptions.include || []
    windiOptions.scanOptions.include.push(__dirname)

    windiOptions.__docuResolved = true
  })

  hook('windicss:config', function (config) {
    config = defu.arrayFn(config || {}, defaultWindiConfig)

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
