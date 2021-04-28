import { join, resolve } from 'path'
import { mkdirp, remove, existsSync, writeJSONSync } from 'fs-extra'
import clearModule from 'clear-module'
import { Module } from '@nuxt/types'
import defu from 'defu'
import { DocusSettings } from 'src/types'
import { docusDefaults } from './defaults'

export default <Module>function settingsModule() {
  const { options, hook, callHook } = this.nuxt

  // Get cache dir for Docus inside project rootDir
  const cacheDir = join(options.rootDir, 'node_modules/.cache/docus')

  // Get Docus config path
  let settingsPath = resolve(options.srcDir, 'docus.config')
  if (existsSync(settingsPath + '.js')) settingsPath += '.js'
  if (existsSync(settingsPath + '.ts')) settingsPath += '.ts'

  // Get theme settings path
  if (!options.themeDir) {
    // eslint-disable-next-line no-console
    console.warn('`themeDir` is not specified in current theme, fallback to default theme')
    options.themeDir = resolve(__dirname, '..', 'defaultTheme')
  }
  let themeDefaultsPath = resolve(options.themeDir, 'settings')
  if (existsSync(themeDefaultsPath + '.js')) themeDefaultsPath += '.js'
  if (existsSync(themeDefaultsPath + '.ts')) themeDefaultsPath += '.ts'

  // Delete Node cache for settings files
  clearModule(themeDefaultsPath)
  clearModule(settingsPath)
  // Get user settings
  let userSettings
  try {
    userSettings = require(settingsPath)
    userSettings = userSettings?.default || userSettings
  } catch (err) {
    // eslint-disable-next-line no-console
    console.info('Using default Docus config, please create a `docus.config.js|ts` to overwrite it.')
  }
  // Get theme defaults
  let themeDefaults
  try {
    themeDefaults = require(themeDefaultsPath)
    themeDefaults = themeDefaults?.default || themeDefaults
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(`Could not fetch theme settings in ${themeDefaultsPath}`)
  }
  // Merge default settings and default theme settings
  const settings = defu(userSettings, docusDefaults)
  settings.theme = defu(userSettings?.theme, themeDefaults)

  // Default title and description for pages
  options.meta.name = settings.title
  options.meta.description = settings.description

  hook('modules:done', async () => {
    // Call hooks of modules to extend Docus settings
    await callHook('docus:settings', settings)

    const jsonPath = join(cacheDir, 'docus-settings.json')

    // Replace the directory
    if (existsSync(cacheDir)) await remove(cacheDir)
    await mkdirp(cacheDir)

    // Write settings
    writeJSONSync(jsonPath, settings)
  })

  // Watch settings
  options.watch.push(settingsPath)
}
