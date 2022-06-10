import type { NavItem, ParsedContent } from '@nuxt/content/dist/runtime/types'
import { useState } from '#imports'

export const useDocusState = () => {
  /**
   * Navigation tree from root of app.
   */
  const navigation = useState<NavItem[]>('docus-navigation', () => null)

  /**
   * Current page complete data.
   */
  const page = useState<ParsedContent>('docus-page', () => null)

  /**
   * Previous and next page data.
   * Format: [prev, next]
   */
  const surround = useState<ParsedContent[]>('docus-page-surround', () => null)

  /**
   * Theme configuration.
   */
  const theme = useState<DocusThemeConfig>('docus-theme', () => null)

  return {
    navigation,
    page,
    surround,
    theme,
  }
}
