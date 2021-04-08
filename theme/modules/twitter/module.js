import { resolve } from 'path'
import twitterRemarkPlugin from './remark'
const r = (...args) => resolve(__dirname, ...args)

export default function docusTwitterModule (options) {
  const { nuxt } = this
  const { hook } = nuxt

  hook('content:options', (options) => {
    options.markdown.remarkPlugins.push({
      instance: twitterRemarkPlugin,
      name: 'remark-docus-twitter',
      options: undefined
    })
  })

  hook('components:dirs', (dirs) => {
    dirs.push({
      path: r('runtime/components'),
      global: true,
      level: 2
    })
  })
}
