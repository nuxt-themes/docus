import { Module } from '@nuxt/types'

export default <Module>function docusThemeModule() {
  const { nuxt, requireModule } = this
  const { options } = nuxt

  if (options.theme && options.theme.path) requireModule(options.theme.path)
  else requireModule('../components')
}
