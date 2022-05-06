import type { NuxtConfig } from 'nuxt'

export interface NuxtLayer {
  config: NuxtConfig
  configFile: string
  cwd: string
}

/**
 * Resolve `theme` config layers from `extends` layers and merge them via `Object.assign()`.
 */
export const resolveTheme = (layers: NuxtLayer[]) => {
  const defaults = {}

  for (const layer of layers) {
    if (layer.config.theme) {
      Object.assign(defaults, layer.config.theme)
    }
  }

  return defaults
}
