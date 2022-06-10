import { createDefu } from 'defu'

export interface NuxtLayer {
  config: any
  configFile: string
  cwd: string
}

export const themeMerger = createDefu((obj, key, value) => {
  if (obj[key] && Array.isArray(obj[key])) {
    obj[key] = value
    return true
  }
})

/**
 * Resolve `theme` config layers from `extends` layers and merge them via `Object.assign()`.
 */
export const resolveTheme = (layers: NuxtLayer[]) => {
  let defaults = {}

  for (const layer of layers) {
    if (layer.config.theme) {
      defaults = themeMerger(defaults, layer.config.theme)
    }
  }

  return defaults
}
