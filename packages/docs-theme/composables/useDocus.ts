import { createDefu } from 'defu'
import { computed, useContent, useRuntimeConfig } from '#imports'

const themeMerger = createDefu((obj, key, value) => {
  if (obj[key] && Array.isArray(obj[key])) {
    obj[key] = value
    return true
  }
})

export const useDocus = () => {
  const { docus: docusRuntimeConfig } = useRuntimeConfig()

  const { globals, navigation, page, surround, toc, type, layout, next, prev } = useContent()

  const defaultThemeConfig = computed(() => {
    return docusRuntimeConfig?.defaultThemeConfig || {}
  })

  /**
   * Theme computed.
   */
  const theme = computed(() => {
    // Grab _theme.yml value
    const themeValue = globals.value?.theme || {}

    // Disable debug in production
    if (process.env.NODE_ENV === 'production') {
      if (themeValue) themeValue.debug = false
    }

    // Return merged config
    const themeConfig = themeMerger(themeValue, defaultThemeConfig.value)

    return themeConfig
  })

  return {
    globals,
    theme,
    navigation,
    surround,
    page,
    toc,
    type,
    layout,
    next,
    prev,
  }
}
