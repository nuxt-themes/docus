import { resolve } from 'path'
import { Module } from '@nuxt/types'
import fg from 'fast-glob'

// serve components preview under `/__components`
export default <Module>async function () {
  const { nuxt } = this

  const dir = resolve(nuxt.options.srcDir, 'components')
  const components = await fg('**/*.vue', { cwd: dir })

  nuxt.options.layouts.none = resolve(__dirname, 'runtime/noneLayout.vue')
  nuxt.hook('build:extendRoutes', (routes: any[]) => {
    routes.unshift({
      name: 'components-preview',
      path: '/__components',
      component: resolve(__dirname, 'runtime/preview.vue'),
      children: components.map(i => ({
        path: i,
        component: resolve(dir, i)
      }))
    })
  })
}
