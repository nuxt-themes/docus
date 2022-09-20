import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'docus',
    version: '3.0.0',
    configKey: 'docus',
  },
  setup(_, nuxt) {
    nuxt.hook('nitro:config', (nitroConfig) => {
      nuxt.options.nitro.prerender = nuxt.options.nitro.prerender || {}
      nuxt.options.nitro.prerender.routes = nuxt.options.nitro.prerender.routes || []
      nuxt.options.nitro.prerender.routes.push(...nitroConfig.prerender.routes)
    })
  },
})
