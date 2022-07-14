import { computed, useContent, useNuxtApp } from '#imports'

export const useDocus = () => {
  const { $theme } = useNuxtApp()

  const { globals, navigation, page, surround, toc, type, layout, next, prev } = useContent()

  const theme = computed(() => {
    return $theme.value
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
