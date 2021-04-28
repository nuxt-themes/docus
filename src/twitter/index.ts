import { resolve } from 'path'
import { Module } from '@nuxt/types'
import tweetDirective from './lib/directive'

const r = (...args) => resolve(__dirname, ...args)

export default <Module>function docusTwitterModule() {
  const { nuxt } = this
  const { hook } = nuxt

  hook('docus:parserOptions', options => {
    if (!options.markdown.directives) {
      options.markdown.directives = {}
    }
    options.markdown.directives.tweet = tweetDirective
  })

  hook('components:dirs', dirs => {
    dirs.push({
      path: r('components'),
      global: true,
      level: 2
    })
  })
}
