import { resolve } from 'path'
import defu from 'defu'
import { Module } from '@nuxt/types'
import { glob } from 'siroc'
import gracefulFs from 'graceful-fs'
import defaultWindiConfig from './windi.config'
import typographyWorkaround from './utils/workaround'

const fs = gracefulFs.promises
const r = (...args: string[]) => resolve(__dirname, ...args)

export default <Module>function docusDefaultThemeModule() {
  const { nuxt, requireModule, addPlugin } = this
  const { hook, options } = nuxt

  // Override editor style on dev mode
  if (options.dev) {
    options.css.push(r('css/main.dev.css'))
  }

  options.css.push(r('css/main.css'), r('css/prism.css'))

  // Disable color mode class suffix
  options.colorMode = {
    classSuffix: ''
  }

  // WindiCSS setup
  hook('windicss:options', (windiOptions: any) => {
    // Merge user & local Windi config
    windiOptions.config = defu.arrayFn(windiOptions.config || {}, defaultWindiConfig)

    // Include user directory in scan process
    windiOptions.scan.dirs.push(resolve(`${options.srcDir}/components/**/*`))
    windiOptions.scan.dirs.push(resolve(`${options.srcDir}/pages/**/*`))
    windiOptions.scan.dirs.push(resolve(`${options.srcDir}/layouts/**/*`))
    windiOptions.scan.dirs.push(resolve(options.srcDir, options.publicRuntimeConfig.contentDir, '**/*'))

    // Include local directory in scan process
    windiOptions.scan.include = windiOptions.scan.include || []
    windiOptions.scan.include.push(__dirname)

    // Include the NPM dependency
    windiOptions.scanOptions.include.push(options.rootDir + '/node_modules/docus/dist')
    windiOptions.scanOptions.include.push(
      options.rootDir + '/node_modules/docus/dist/**/*.{html,vue,md,mdx,pug,jsx,tsx,svelte}'
    )

    // Workaround for typography plugin not being a function supporting theme
    // TODO: Remove this once we remove the dependency on `prose`
    typographyWorkaround(windiOptions, nuxt)
  })

  // Configure `components/` dir
  hook('components:dirs', async (dirs: any) => {
    // Atoms
    dirs.push({
      path: r('./components/atoms'),
      global: true,
      level: 2
    })
    dirs.push({
      path: r('./components/atoms/icons'),
      global: true,
      level: 2
    })

    // Molecules
    dirs.push({
      path: r('./components/molecules'),
      global: true,
      level: 2
    })

    // Organisms
    dirs.push({
      path: r('./components/organisms'),
      global: true,
      level: 2
    })
    dirs.push({
      path: r('./components/organisms/slots'),
      global: true,
      level: 3
    })
    if (options.dev) {
      dirs.push({
        path: r('./components/organisms/dev-slots'),
        global: true,
        level: 2
      })
    }

    // Templates
    dirs.push({
      path: r('./components/templates'),
      global: true,
      level: 2
    })

    // Get the user root `components` folder
    const componentsDirPath = resolve(nuxt.options.rootDir, 'components')
    const componentsDirStat = await fs.stat(componentsDirPath).catch(() => null)

    if (componentsDirStat && componentsDirStat.isDirectory()) {
      // Register the root `components` directory
      dirs.push({
        path: componentsDirPath,
        global: true
      })

      // Check for sub directories
      const subDirs = await glob(componentsDirPath + '/*/')

      // Register each subdirectories
      subDirs.forEach((path: string) => dirs.push({ path, global: true }))
    } else {
      // Watch existence of root `components` directory
      nuxt.options.watch.push(componentsDirPath)
    }
  })

  // Add layouts
  hook('build:before', async () => {
    // Add default error page if not defined
    const errorPagePath = resolve(options.srcDir, options.dir.layouts, 'error.vue')
    const errorPageExists = await fs.stat(errorPagePath).catch(() => false)
    if (!errorPageExists) {
      options.ErrorPage = options.ErrorPage || r('layouts/error.vue')
    }
  })

  // Modules
  requireModule('nuxt-windicss')
  requireModule('@nuxtjs/color-mode')

  // Plugins
  addPlugin({
    src: r('plugins/menu.ts')
  })
}
