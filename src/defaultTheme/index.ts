import { resolve } from 'path'
import { nuxtConfig } from 'nuxt-extend'
import defu from 'defu'
import type { NuxtConfig } from '@nuxt/types'
import gracefulFs from 'graceful-fs'
import { glob } from 'siroc'
import defaultWindiConfig from './windi.config'
import typographyWorkaround from './utils/workaround'

const r = (...args: string[]) => resolve(__dirname, ...args)

// WindiCSS setup
function themeSetupModule() {
  const { nuxt } = this
  const { options, hook } = nuxt

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

  hook('components:dirs', async (dirs: any) => {
    // Get the user root `components` folder
    // TODO: This should be done via nuxt-extend
    const componentsDirPath = resolve(nuxt.options.rootDir, 'components')
    const componentsDirStat = await gracefulFs.promises.stat(componentsDirPath).catch(() => null)

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
}

const readyHook = ({ options }) => {
  // Override editor style on dev mode
  if (options.dev) {
    options.css.push(r('css/main.dev.css'))
  }

  // Push local css files
  options.css.push(r('css/main.css'))
  options.css.push(r('css/prism.css'))

  // Disable color mode class suffix
  options.colorMode = {
    classSuffix: ''
  }
}

const beforeBuildHook = async ({ options }) => {
  // Add default error page if not defined
  const errorPagePath = resolve(options.srcDir, options.dir.layouts, 'error.vue')
  const errorPageExists = await gracefulFs.promises.stat(errorPagePath).catch(() => false)
  if (!errorPageExists) options.ErrorPage = options.ErrorPage || r('layouts/error.vue')
}

const themeConfig: NuxtConfig = nuxtConfig({
  name: 'defaultTheme',
  rootDir: __dirname,
  components: [
    {
      path: r('./components/atoms'),
      global: true,
      level: 2
    },
    {
      path: r('./components/atoms/icons'),
      global: true,
      level: 2
    },
    {
      path: r('./components/molecules'),
      global: true,
      level: 2
    },
    {
      path: r('./components/organisms'),
      global: true,
      level: 2
    },
    {
      path: r('./components/organisms/slots'),
      global: true,
      level: 3
    },
    {
      path: r('./components/templates'),
      global: true,
      level: 3
    }
  ],
  plugins: [r('plugins/menu.ts')],
  modules: [themeSetupModule, 'nuxt-windicss', '@nuxtjs/color-mode'],
  hooks: {
    ready: readyHook,
    build: {
      before: beforeBuildHook
    }
  }
})

export default themeConfig
