import { computed, useContentHelpers, useDocus, useRoute } from '#imports'

export const useCurrentNavigation = () => {
  const { navPageFromPath, navDirFromPath, navKeyFromPath } = useContentHelpers()

  const { navigation, theme, page } = useDocus()

  const route = useRoute()

  const asideConfig = computed(() => {
    return navKeyFromPath(route.path, 'aside', navigation.value || [])
  })

  const level = computed(() => {
    // Use `aside.level` key from file or navigation
    if (typeof asideConfig.value?.level !== 'undefined') return asideConfig.value?.level

    // Fallback to theme config
    return theme.value?.aside?.level || 0
  })

  const filtered = computed(() => theme.value?.aside?.filter || [])

  const tree = computed(() => {
    let nav = navigation.value || []
    let _path = route.path

    if (asideConfig.value?.root) {
      _path = asideConfig.value?.root

      // Filter nav from local `root` value
      nav = navDirFromPath(_path, nav)
    }

    if (level.value) {
      // Filter if `aside.level` is enabled in theme configuration
      const path = _path.split('/')

      // Get level
      const leveledPath = path.splice(0, 1 + level.value).join('/')

      nav = navDirFromPath(leveledPath, nav) || []

      if (!Array.isArray(nav)) nav = [nav]
    }

    // No navigation found; try to resolve page url
    if (nav.length === 0) {
      nav = navPageFromPath(page.value?._path || '/', navigation.value || [])

      if (!nav) return []

      if (!Array.isArray(nav)) nav = [nav]
    }

    // Filtered using `aside.filter` in theme configuration
    return nav.filter((item) => {
      if (filtered.value.includes(item._path)) return false

      return true
    })
  })

  return { tree, asideConfig }
}
