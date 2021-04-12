import { resolve } from 'path'

const r = (...args) => resolve(__dirname, ...args)

export default function docusAdminModule() {
  const { nuxt } = this
  const { options } = nuxt
  // Docus Devtools
  if (options.dev) {
    options.plugins.push(r('./runtime/docus.ui.js'))
  }
}
