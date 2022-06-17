import { fileURLToPath } from 'url'
import { addPlugin, defineNuxtModule } from '@nuxt/kit'
import { resolve } from 'pathe'

const themeDir = fileURLToPath(new URL('./', import.meta.url))
const resolveThemeDir = (path: string) => resolve(themeDir, path)

export default defineNuxtModule({
  meta: {
    name: 'docus-theme',
    version: '3.0.0',
    compatibility: {
      nuxt: '^3.0.0-rc.3',
      bridge: false,
    },
    configKey: 'docus',
  },
  setup(_, nuxt) {
    const { srcDir } = nuxt.options

    // @ts-expect-error - Push content dir
    nuxt.options.tailwindcss.config.content.push(`${srcDir}/content/**/*.{md,yml,json,json5,csv}`)

    if (nuxt.options.github) {
      addPlugin({
        src: resolveThemeDir('integrations/github.ts'),
      })
    }

    // @ts-expect-error - Algolia module
    if (nuxt.options?.algolia?.docSearch) {
      addPlugin({
        src: resolveThemeDir('integrations/docsearch.ts'),
      })
    }
  },
})
