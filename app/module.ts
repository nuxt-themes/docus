import { fileURLToPath } from 'url'
import { addPlugin, defineNuxtModule, createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)
const resolveThemeDir = (path: string) => resolve('./', path)

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
  setup(_, nuxt) {
    if (nuxt.options?.runtimeConfig?.public?.algolia?.docSearch) {
      addPlugin({
        src: resolveThemeDir('integrations/docsearch.ts')
      })
    }
  }
})
