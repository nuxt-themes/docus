import { resolve } from 'path'
import defu from 'defu'
import defaultWindiConfig from './windi.config'
const r = path => resolve(__dirname, path)

export default function (nuxt) {
  const { hook, options } = nuxt

  hook('windicss:config', function (windiConfig) {
    windiConfig.config = defu.arrayFn(windiConfig.config || {}, defaultWindiConfig)

    // include user content directory in scan process
    windiConfig.scan.dirs.push(
      r('components/'),
      r('layouts/'),
      r('pages/'),
      r('plugins/'),
      r('utils/'),
      resolve(options.srcDir, options.publicRuntimeConfig.contentDir, '**/*')
    )
    windiConfig.scan.include = windiConfig.scan.include || []
    windiConfig.scan.include.push(__dirname)

    // Workaround for typography plugin not being a function supporting theme
    if (typeof windiConfig.config.theme.extend.typography === 'function') {
      const defaultTheme = nuxt.resolver.requireModule('windicss/defaultTheme')
      const theme = (key) => {
        const keys = key.split('.')
        return keys.reduce((res, _key) => res[_key], defu(windiConfig.config.theme, defaultTheme))
      }
      windiConfig.config.theme.extend.typography = windiConfig.config.theme.extend.typography(theme)
    }
    // console.log(windiConfig.config.theme.colors)
  })
}
