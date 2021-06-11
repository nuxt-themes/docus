import { resolve } from 'path'
import { Config as WindiConfig } from 'windicss/types/interfaces'
import { Module } from '@nuxt/types'
import { ParserOptions } from '../types'
import tweetDirective from './lib/directive'

const r = (...args) => resolve(__dirname, ...args)

export default <Module>function docusTwitterModule() {
  const { nuxt } = this
  const { hook } = nuxt

  hook('docus:parserOptions', (options: Partial<ParserOptions>) => {
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

  hook('windicss:options', (windiOptions: WindiConfig) => {
    windiOptions.scanOptions.include.push(r('components') + '/*.vue')
  })
}
