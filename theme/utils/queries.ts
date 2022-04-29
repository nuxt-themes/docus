import { withoutTrailingSlash } from 'ufo'
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
import type { RouteLocationNormalized, RouteLocationNormalizedLoaded } from 'vue-router'
import { defaultThemeConfig } from './theme'
import { useDocusState } from './state'
import { fetchContentNavigation, queryContent } from '#imports'

export const queryPage = async (route: RouteLocationNormalized | RouteLocationNormalizedLoaded) => {
  const path = withoutTrailingSlash(route.path)

  const { page, surround } = useDocusState()

  try {
    await Promise.all([
      queryContent().where({ slug: path }).findOne() as Promise<ParsedContent>,
      queryContent().where({ partial: { $not: true }, navigation: { $not: false } }).findSurround(path) as Promise<ParsedContent[]>,
    ]).then(
      ([_page, _surround]) => {
        if (_page)
          page.value = _page
        else page.value = undefined

        if (_surround && _surround.length)
          surround.value = _surround
        else surround.value = undefined

        // Handle layout update from page
        if (_page?.layout)
          route.meta.layout = _page?.layout
        else
          route.meta.layout = 'default'
      },
    )
  }
  catch (e) {
    console.warn(`Could not find page for path ${path}!`)
    page.value = undefined
    surround.value = undefined
  }
}

export const queryNavigation = async () => {
  const { navigation } = useDocusState()

  navigation.value = await fetchContentNavigation(queryContent().where({
    navigation: {
      $not: false,
    },
  }))
}

export const queryTheme = async () => {
  const { theme } = useDocusState()

  // Fetch _theme.yml at `content/` root.
  const query = await queryContent().where({
    id: 'content:_theme.yml',
  }).findOne()

  if (!query) {
    // Assign default theme config if none found.
    theme.value = defaultThemeConfig

    return
  }

  theme.value = query.body
}
