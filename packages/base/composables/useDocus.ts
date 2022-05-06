import { useDocusState } from '../utils'
import { computed, useRuntimeConfig } from '#imports'

export const useDocus = () => {
  const { docus: docusRuntimeConfig } = useRuntimeConfig()

  const { theme: _theme, navigation, page, surround } = useDocusState()

  /**
   * Theme computed.
   */
  const theme = computed(() => {
    // Grab _theme.yml value
    const themeValue = { ..._theme.value } || {}

    // Grab default theme config
    const defaultThemeConfig = docusRuntimeConfig?.defaultThemeConfig || {}

    // Disable debug in production
    if (process.env.NODE_ENV === 'production') {
      if (themeValue) _theme.value.debug = false
    }

    // Return merged config
    const themeConfig = Object.assign({}, defaultThemeConfig, themeValue)

    console.log(themeConfig)

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
