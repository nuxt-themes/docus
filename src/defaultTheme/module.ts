import { resolve, join, dirname } from 'path'
import _glob from 'glob'
import type { IOptions as GlobOptions } from 'glob'
import { Config as WindiConfig } from 'windicss/types/interfaces'
import { existsSync } from 'fs-extra'
import defu from 'defu'
import { Module, NuxtOptions } from '@nuxt/types'
import gracefulFs from 'graceful-fs'
import clearModule from 'clear-module'
import jiti from 'jiti'
import { DefaultExtractor } from '@windicss/plugin-utils'
import defaultWindiConfig from './windi.config'

const r = (...args: string[]) => resolve(__dirname, ...args)

const glob = (pattern: string, options: GlobOptions = {}) =>
  new Promise<string[]>((resolve, reject) =>
    _glob(pattern, options, (err, matches) => {
      if (err) return reject(err)
      resolve(matches)
    })
  )

const _require = jiti(__filename)

export const beforeBuildHook = async ({ options }) => {
  // Add default error page if not defined
  const errorPagePath = resolve(options.srcDir, options.dir.layouts, 'error.vue')
  const errorPageExists = await gracefulFs.promises.stat(errorPagePath).catch(() => false)
  if (!errorPageExists) options.ErrorPage = options.ErrorPage || r('layouts/error.vue')
}

const loadWindiConfig = (options: NuxtOptions): WindiConfig | undefined => {
  // Get Windi config path
  let windiPath = resolve(options.srcDir)
  if (existsSync(windiPath + '/windi.config.js')) windiPath += '/windi.config.js'
  else if (existsSync(windiPath + '/windi.config.ts')) windiPath += '/windi.config.ts'
  else if (existsSync(windiPath + '/tailwind.config.js')) windiPath += '/tailwind.config.js'
  else if (existsSync(windiPath + '/tailwind.config.ts')) windiPath += '/tailwind.config.ts'

  // Delete Node cache for Windi config
  clearModule(windiPath)

  // Get Windi config
  let localWindiConfig
  try {
    localWindiConfig = _require(windiPath)
    localWindiConfig = localWindiConfig?.default || localWindiConfig
  } catch (_) {}

  return localWindiConfig
}

// WindiCSS setup
export default <Module>function themeSetupModule() {
  const { nuxt, $docus } = this
  const { options, hook } = nuxt
  const { settings } = $docus

  // Windi glob used for includes
  const windiGlob = '/**/*.{html,vue,md,mdx,pug,jsx,tsx,svelte,css,ts,js}'
  // Get Windi config at user project level
  const localWindiConfig = loadWindiConfig(options)

  hook('windicss:options', async (windiOptions: WindiConfig) => {
    // Merge user and theme Windi configs
    windiOptions.config = defu.arrayFn(windiOptions.config || {}, localWindiConfig || {}, defaultWindiConfig)
    const docusDist = join(dirname(require.resolve('docus/package.json')), 'dist')

    // Resolve admin runtime path
    const adminPath = join(__dirname, '../admin')

    // Resolve content dir path
    const contentDir = resolve(options.srcDir, settings.contentDir)

    // Glob grabbing all Docus files
    const transformFiles = await glob('**/*.{vue,css,md}', {
      cwd: docusDist,
      nodir: true,
      absolute: true
    })

    const cssFiles = transformFiles.filter((f: string) => f.endsWith('.css'))
    const vueFiles = transformFiles.filter((f: string) => f.endsWith('.vue'))
    const mdFiles = transformFiles.filter((f: string) => f.endsWith('.md'))

    // Make sure file @apply's get transformed
    windiOptions.scanOptions.extraTransformTargets = {
      css: [
        ...cssFiles,
        ...vueFiles.flatMap(i => [
          `${i}?vue&type=style&index=0&scoped=true&lang.postcss`,
          `${i}?vue&type=style&index=0&lang.postcss`
        ])
      ],
      detect: [...vueFiles, ...mdFiles]
    }

    // extract custom markdown syntax, #503
    windiOptions.scanOptions.extractors.push({
      extensions: ['md'],
      extractor(code, id) {
        const data = DefaultExtractor(code, id)

        const classes = new Set(data.classes)
        classes.forEach(i => {
          if (i.startsWith('.')) classes.add(i.slice(1))
        })

        return {
          ...data,
          classes: Array.from(classes)
        }
      }
    })

    // Push every included path into scan options
    windiOptions.scanOptions.include.push(
      join(contentDir, windiGlob),
      join(adminPath, windiGlob),
      join(__dirname, windiGlob),
      join(docusDist, windiGlob),
      join(options.themeDir, windiGlob)
    )

    // Merge shortcuts
    windiOptions.config.shortcuts = {
      ...(windiOptions.config.shortcuts || {}),
      ...(settings?.theme?.shortcuts || {})
    }

    return windiOptions
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
        isAsync: false
      })

      // Check for sub directories
      const subDirs = await glob(componentsDirPath + '/**/')

      // Register each subdirectories
      subDirs.forEach((path: string) => dirs.push({ path, global: true }))
    } else {
      // Watch existence of root `components` directory
      options.watch.push(componentsDirPath)
    }
  })

  options.watch.push(r('./settings.ts'))
}
