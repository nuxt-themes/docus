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
  let themeDefaultsPath = resolve(options.themeDir, 'settings')
  if (existsSync(themeDefaultsPath + '.js')) themeDefaultsPath += '.js'
  if (existsSync(themeDefaultsPath + '.ts')) themeDefaultsPath += '.ts'

  let settings: DocusSettings
  try {
    // Delete Node cache for settings files
    clearModule(themeDefaultsPath)
    clearModule(settingsPath)
    // Get theme defaults and user settings
    const _themeDefaults = require(themeDefaultsPath)
    const _userSettings = require(settingsPath)

    // Resolve data for both
    const themeDefaults = _themeDefaults.default || _themeDefaults
    const { theme: themeSettings, ...userSettings } = _userSettings.default || _userSettings

    // Merge default settings and default theme settings
    settings = defu(userSettings, docusDefaults)
    settings.theme = defu(themeSettings, themeDefaults)

    // Default title and description for pages
    options.meta.name = settings.title
    options.meta.description = settings.description
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Could not fetch settings, please create a `docus.config.js|ts` at the root of your project.')
  }

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
