import { defineNuxtModule } from '@nuxt/kit'

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
  },
})
