import { resolve } from 'path'
import { Module } from '@nuxt/types'
import { useDefaults } from './settings'

export default <Module>function settingsModule() {
  const { nuxt } = this
  const { options } = nuxt

  // Read Docus settings
  const settingsPath = resolve(options.srcDir, 'settings.json')

  try {
    const userSettings = require(settingsPath)
    const settings = useDefaults(userSettings)

    // default title and description for pages
    options.meta.name = settings.title
    options.meta.description = settings.description
  } catch (err) {
    /* settings not found */
  }
}
