import { addPlugin, defineNuxtModule, createResolver } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'docus',
    version: '3.0.0',
    compatibility: {
      nuxt: '^3.0.0-rc.14',
      bridge: false
    },
    configKey: 'docus'
  },
  setup (_, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    if (nuxt.options?.runtimeConfig?.public?.algolia?.docSearch) {
      addPlugin({
        src: resolve('integrations/docsearch')
      })
    }
  }
})
