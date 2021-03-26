import { resolve, relative } from 'path'
import defu from 'defu'
import defaultWindiConfig from './windi.config'


export default function (nuxt) {
  const { hook, options } = nuxt

  hook('windicss:options', function (windiOptions) {
    // avoid duplicate scans on re-parse
    if (windiOptions.__docuResolved) {
      return
    }

    const r = path => relative(windiOptions.root, resolve(__dirname, path))
    // include user content directory in scan process
    windiOptions.scanOptions.dirs.push(
      r('components/'),
      r('layouts/'),
      r('pages/'),
      r('plugins/'),
      r('utils/'),
      resolve(options.srcDir, options.publicRuntimeConfig.contentDir)
    )

    // avoid scanning everything in the root folder
    const rootScanEntry = windiOptions.scanOptions.dirs.indexOf('./');
    if (rootScanEntry !== -1) {
      windiOptions.scanOptions.dirs.splice(rootScanEntry, 1);
    }

    windiOptions.__docuResolved = true
  })

  hook('windicss:config', function (config) {
    // merge default config with provided
    Object.assign(config, defaultWindiConfig)

    // Workaround for typography plugin not being a function supporting theme
    if (typeof config.theme.extend.typography === 'function') {
      const defaultTheme = nuxt.resolver.requireModule('windicss/defaultTheme')
      const theme = (key) => {
        const keys = key.split('.')
        return keys.reduce((res, _key) => res[_key], defu(config.theme, defaultTheme))
      }
      config.theme.extend.typography = config.theme.extend.typography(theme)
    }
    console.log(config)
  })
}
