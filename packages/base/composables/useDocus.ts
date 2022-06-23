import { themeMerger } from '../utils/theme'
import { computed, useContent, useRuntimeConfig } from '#imports'

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
