import { themeMerger } from '../utils/theme'
import { computed, unref, useDocusState, useRuntimeConfig } from '#imports'

export const useDocus = () => {
  const { docus: docusRuntimeConfig } = useRuntimeConfig()

  const { theme: _theme, navigation, page, surround } = useDocusState()

  const defaultThemeConfig = computed(() => {
    return docusRuntimeConfig?.defaultThemeConfig || {}
  })

  /**
   * Theme computed.
   */
  const theme = computed(() => {
    // Grab _theme.yml value
    const themeValue = unref(_theme.value) || {}

    // Disable debug in production
    if (process.env.NODE_ENV === 'production') {
      if (themeValue) themeValue.debug = false
    }

    // Return merged config
    const themeConfig = themeMerger(themeValue, defaultThemeConfig.value)

    return themeConfig
  })

  /**
   * Table of contents from parsed page.
   */
  const toc = computed(() => page?.value?.body?.toc || [])

  /**
   * Content type from parsed page.
   */
  const type = computed(() => page.value?.meta?.type)

  /**
   * Layout type from parsed page.
   */
  const layout = computed(() => page.value?.meta?.layout)

  /**
   * Next page from `surround`.
   */
  const next = computed(() => surround.value?.[1] || null)

  /**
   * Previous page from `surround`.
   */
  const prev = computed(() => surround.value?.[0] || null)

  return {
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
