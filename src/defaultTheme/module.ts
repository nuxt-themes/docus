import { resolve, join } from 'path'
import { Config as WindiConfig } from 'windicss/types/interfaces'
import { glob } from 'siroc'
import defu from 'defu'
import { Module } from '@nuxt/types'
import gracefulFs from 'graceful-fs'
import defaultWindiConfig from './windi.config'

const r = (...args: string[]) => resolve(__dirname, ...args)

export const readyHook = ({ options }) => {
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

export const beforeBuildHook = async ({ options }) => {
  // Add default error page if not defined
  const errorPagePath = resolve(options.srcDir, options.dir.layouts, 'error.vue')
  const errorPageExists = await gracefulFs.promises.stat(errorPagePath).catch(() => false)
  if (!errorPageExists) options.ErrorPage = options.ErrorPage || r('layouts/error.vue')
}

// WindiCSS setup
export default <Module>function themeSetupModule() {
  const { nuxt, $docus } = this
  const { options, hook } = nuxt
  const { settings } = $docus

  hook('windicss:options', (windiOptions: WindiConfig) => {
    // Merge user & local Windi config
    windiOptions.config = defu.arrayFn(windiOptions.config || {}, defaultWindiConfig)

    // Include local & npm depencies directories in scan process
    windiOptions.scanOptions.dirs.push(__dirname, join(options.rootDir, '/node_modules/docus/dist'), options.themeDir)

    windiOptions.config.shortcuts = {
      ...(windiOptions.shortcuts || {}),
      ...(settings?.theme?.shortcuts || {})
    }
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

  hook('ready', readyHook)

  hook('build:before', beforeBuildHook)
}
