import { addTemplate, defineNuxtModule, logger } from '@nuxt/kit'
import { generateTypes, resolveSchema } from 'untyped'
import { resolve } from 'pathe'
import { version } from '../../package.json'
import type { NuxtLayer } from './utils/theme'
import { resolveTheme } from './utils/theme'

const motd = () => logger.success(`Using Docus v${version}`)

export default defineNuxtModule({
  meta: {
    name: 'docus',
    version: '3.0.0',
    compatibility: {
      nuxt: '^3.0.0-rc.3',
      bridge: false,
    },
    configKey: 'docus',
  },
  defaults: {},
  setup(moduleOptions, nuxt) {
    // Make also VT detects it
    nuxt.options.runtimeConfig.public.docus = nuxt.options.runtimeConfig.public.docus || {}

    nuxt.hook('modules:done', () => {
      const layers = nuxt.options._layers

      const theme = resolveTheme(layers as NuxtLayer[])

      addTemplate({
        filename: 'types/theme.d.ts',
        getContents: () =>
          `${generateTypes(resolveSchema(theme), { addDefaults: true, allowExtraKeys: true, interfaceName: 'DocusThemeConfig' })}\n
declare module '@nuxt/schema' {
  interface NuxtConfig {
    theme: Partial<DocusThemeConfig>
  }
}`,
      })

      nuxt.options.runtimeConfig.public.docus.defaultThemeConfig = theme
    })

    nuxt.hook('modules:done', async () => {
      motd()
    })

    nuxt.hook('prepare:types', (opts) => {
      opts.references.push({ path: resolve(nuxt.options.buildDir, 'types/theme.d.ts') })
    })
  },
})
