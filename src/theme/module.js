import { resolve } from 'path'
import defu from 'defu'
import defaultWindiConfig from './windi.config'
const r = path => resolve(__dirname, path)

export default function docusThemeModule() {
  const { nuxt, requireModule } = this
  const { hook, options } = nuxt

  hook('windicss:options', function (windiOptions) {
    windiOptions.config = defu.arrayFn(windiOptions.config || {}, defaultWindiConfig)

    // include user content directory in scan process
    windiOptions.scan.dirs.push(
      r('components/'),
      r('layouts/'),
      r('pages/'),
      r('plugins/'),
      r('utils/'),
      resolve(options.srcDir, options.publicRuntimeConfig.contentDir, '**/*')
    )
    windiOptions.scan.include = windiOptions.scan.include || []
    windiOptions.scan.include.push(__dirname)

    // Include the npm dependency
    windiOptions.scanOptions.include.push(options.rootDir + '/node_modules/docus/dist')
    windiOptions.scanOptions.include.push(
      options.rootDir + '/node_modules/docus/dist/**/*.{html,vue,md,mdx,pug,jsx,tsx,svelte}'
    )

    // Workaround for typography plugin not being a function supporting theme
    if (typeof windiOptions.config.theme.extend.typography === 'function') {
      const defaultTheme = nuxt.resolver.requireModule('windicss/defaultTheme')

      const theme = key => {
        const keys = key.split('.')
        return keys.reduce((res, _key) => res[_key], defu(windiOptions.config.theme, defaultTheme))
      }

      windiOptions.config.theme.extend.typography = windiOptions.config.theme.extend.typography(theme)
    }
  })

  // Override editor style on dev mode
  if (options.dev) {
    options.css.push(r('css/main.dev.css'))
  }
  options.css.push(r('css/main.css'), r('css/prism.css'))

  // disable color mode class suffix
  options.colorMode = {
    classSuffix: ''
  }

  requireModule('nuxt-windicss')
  requireModule('@nuxtjs/color-mode')
}
