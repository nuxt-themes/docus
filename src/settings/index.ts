import { join, resolve } from 'path'
import { mkdirp, remove, existsSync, writeJSONSync } from 'fs-extra'
import { Module } from '@nuxt/types'
import defu from 'defu'
import { docusDefaults } from './defaults'

export default <Module>function settingsModule() {
  const { options, hook } = this.nuxt

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

  try {
    // Delete Node cache for settings files
    // TODO: Remove this in favor of cleaner approach
    delete require.cache[themeDefaultsPath]
    delete require.cache[settingsPath]
    // Get theme defaults and user settings
    const _themeDefaults = require(themeDefaultsPath)
    const _userSettings = require(settingsPath)

    // Resolve data for both
    const themeDefaults = _themeDefaults.default || _themeDefaults
    const { theme: themeSettings, ...userSettings } = _userSettings.default || _userSettings

    // Merge default settings and default theme settings
    const settings = defu(userSettings, docusDefaults)
    settings.theme = defu(themeSettings, themeDefaults)

    // Default title and description for pages
    options.meta.name = settings.title
    options.meta.description = settings.description

    this.docus = settings
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Could not get settings! You need to have a `docus.config.js|ts` at the root of your project.')
  }

  hook('modules:done', async container => {
    const jsonPath = join(cacheDir, 'docus-settings.json')

    // Replace the directory
    if (existsSync(cacheDir)) await remove(cacheDir)
    await mkdirp(cacheDir)

    // Write settings
    writeJSONSync(jsonPath, container.docus)
  })

  // Watch settings
  options.watch.push(settingsPath)
}
