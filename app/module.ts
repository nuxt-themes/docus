import { fileURLToPath } from 'url'
import { addPlugin, defineNuxtModule } from '@nuxt/kit'
import { resolve } from 'pathe'

const themeDir = fileURLToPath(new URL('./', import.meta.url))
const resolveThemeDir = (path: string) => resolve(themeDir, path)

export default defineNuxtModule({
  meta: {
    name: 'docus',
    version: '3.0.0',
    compatibility: {
      nuxt: '^3.0.0-rc.4',
      bridge: false,
    },
    configKey: 'docus',
  },
  setup(_, nuxt) {
    // Pre-render 404 page
    /*
    nuxt.hook('nitro:config', (nitroConfig) => {
      nitroConfig.prerender = nitroConfig.prerender || {}
      nitroConfig.prerender.routes = nitroConfig.prerender.routes || []
      nitroConfig.prerender.routes.push('/404')
      nitroConfig.prerender.routes.push('/')
    })
    */

    // TODO: Remove this workaround
    // Origin: https://github.com/nuxt/framework/pull/5709
    // Issue: https://github.com/nuxt/framework/issues/5827
    nuxt.hook('nitro:config', (nitroConfig) => {
      nuxt.options.nitro.prerender = nuxt.options.nitro.prerender || {}
      nuxt.options.nitro.prerender.routes = nuxt.options.nitro.prerender.routes || []
      nuxt.options.nitro.prerender.routes.push(...nitroConfig.prerender.routes)
    })

    // @ts-expect-error - GitHub module might not be installed
    if (nuxt.options?.github) {
      addPlugin({
        src: resolveThemeDir('integrations/github.ts'),
      })
    }

    // @ts-expect-error - Algolia module might not be installed
    if (nuxt.options?.algolia?.docSearch) {
      addPlugin({
        src: resolveThemeDir('integrations/docsearch.ts'),
      })
    }
  },
})
