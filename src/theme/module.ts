import { Module } from '@nuxt/types'

export default <Module>function docusThemeModule() {
  const { nuxt } = this
  const { options } = nuxt

  console.log(options)
}
