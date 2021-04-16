import { resolve } from 'path'
import { Module } from '@nuxt/types'
import twitterRemarkPlugin from './lib'

const r = (...args) => resolve(__dirname, ...args)

export default <Module>function docusTwitterModule() {
  const { nuxt } = this
  const { hook } = nuxt

  hook('docus:parserOptions', options => {
    if (!options.markdown.remarkPlugins) {
      options.markdown.remarkPlugins = []
    }
    options.markdown.remarkPlugins.push({
      instance: twitterRemarkPlugin,
      name: 'remark-docus-twitter',
      options: undefined
    })
  })

  hook('components:dirs', dirs => {
    dirs.push({
      path: r('components'),
      global: true,
      level: 2
    })
  })
}
