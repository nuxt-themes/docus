import { useDocusState } from '../utils/state'
import { computed } from '#imports'

export const useDocus = () => {
  const { theme, navigation, page, surround } = useDocusState()

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
