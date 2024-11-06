import { fileURLToPath } from 'node:url'
import { defineConfig } from '@playwright/test'
import type { ConfigOptions } from '@nuxt/test-utils/playwright'

export default defineConfig<ConfigOptions>({
  timeout: 120000,
  use: {
    nuxt: {
      rootDir: fileURLToPath(new URL('.starters/default', import.meta.url))
    },
  },
})
