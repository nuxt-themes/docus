import { withoutTrailingSlash } from 'ufo'
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
import type { RouteLocationNormalized, RouteLocationNormalizedLoaded } from 'vue-router'
import { defaultThemeConfig } from './theme'
import { useDocusState } from './state'
import { fetchContentNavigation, queryContent } from '#imports'

const applyPage = (route: RouteLocationNormalized | RouteLocationNormalizedLoaded, page: ParsedContent) => {
  // Handle layout update from page
  if (page?.layout) route.meta.layout = page?.layout
  else route.meta.layout = 'default'
}

export const queryPage = async (route: RouteLocationNormalized | RouteLocationNormalizedLoaded, force = false) => {
  const path = withoutTrailingSlash(route.path)

  const { page, surround } = useDocusState()

  // Page is already fetched, apply it
  if (!force && page.value && page.value.slug === path) {
    applyPage(route, page.value)
    return
  }

  // Fetch page
  try {
    return await Promise.all([
      queryContent().where({ slug: path }).findOne() as Promise<ParsedContent>,
      queryContent()
        .where({ partial: { $not: true }, navigation: { $not: false } })
        .findSurround(path) as Promise<ParsedContent[]>,
    ]).then(([_page, _surround]) => {
      if (_page) page.value = _page
      else page.value = undefined

      if (_surround && _surround.length) surround.value = _surround
      else surround.value = undefined

      applyPage(route, _page)
    })
  } catch (e) {
    console.warn(`Could not find page for path ${path}!`)
    page.value = undefined
    surround.value = undefined
  }
}

export const queryNavigation = async (force = false) => {
  const { navigation } = useDocusState()

  if (!force && navigation.value) return

  await fetchContentNavigation(
    queryContent().where({
      navigation: {
        $not: false,
      },
    }),
  ).then((_navigation) => {
    navigation.value = _navigation
  })
}

export const queryTheme = async (force = false) => {
  const { theme } = useDocusState()

  if (!force && theme.value) return

  // Fetch _theme.yml at `content/` root.
  await queryContent()
    .where({
      id: 'content:_theme.yml',
    })
    .findOne()
    .then((_theme) => {
      if (!_theme) {
        // Assign default theme config if none found.
        theme.value = defaultThemeConfig

        return
      }

      theme.value = _theme.body
    })
}
