import { resolve } from 'path'
import { Module } from '@nuxt/types'

const r = (...args: any[]) => resolve(__dirname, ...args)

export default <Module>function docusAppModule() {
  const { nuxt } = this
  const { hook, options } = nuxt

  // Extend `/` route
  hook('build:extendRoutes', (routes: any[]) => {
    const hasRoute = (name: string) => routes.some(route => route.name === name)

    if (!hasRoute('all')) {
      routes.push({
        path: '/*',
        name: 'all',
        component: r('pages/_.vue')
      })
    }
  })

  // Inject Admin UI
  if (options.dev) {
    options.plugins.push(r('../admin/index'))

    // Disable SSR in dev
    options.ssr = false
    options.build.ssr = false
    options.render.ssr = false
  }
}
