import { join, resolve } from 'path'
import { mkdirp, remove, existsSync, writeFileSync } from 'fs-extra'
import { Module } from '@nuxt/types'
import { useDefaults, useDefaultsTheme } from './settings'

export default <Module>async function settingsModule() {
  const { nuxt } = this
  const { options } = nuxt

  const cacheDir = join(options.rootDir, 'node_modules/.cache/docus')

  // Inject content dir in private runtime config
  const contentDir = options?.content?.dir || 'content'

  options.publicRuntimeConfig.contentDir = contentDir

  // Read Docus settings
  let settingsPath = resolve(options.srcDir, 'docus.config')

  if (existsSync(settingsPath + '.js')) settingsPath += '.js'
  if (existsSync(settingsPath + '.ts')) settingsPath += '.ts'

  try {
    const { theme, ...userSettings } = require(settingsPath)
    const settings = useDefaults(userSettings)
    settings.theme = useDefaultsTheme(theme)

    // Default title and description for pages
    options.meta.name = settings.title
    options.meta.description = settings.description

    // Replace the directory
    if (existsSync(cacheDir)) await remove(cacheDir)
    await mkdirp(cacheDir)
    // Write settings
    writeFileSync(join(cacheDir, 'docus-settings.json'), JSON.stringify(settings))
  } catch (err) {
    console.log(err)
    console.log('Settings not found!')
  }
}
