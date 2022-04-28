import { withoutTrailingSlash } from 'ufo'
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
import type { RouteLocationNormalized, RouteLocationNormalizedLoaded } from 'vue-router'
import { defaultThemeConfig } from './theme'
import { fileFromPath, findBottomLink } from './navigation'
import { useDocusState } from './state'
import { fetchContentNavigation, queryContent } from '#imports'

export const queryPage = async(route: RouteLocationNormalized | RouteLocationNormalizedLoaded) => {
  const path = withoutTrailingSlash(route.path)
  const splitted = path.split('/')
  const directory = splitted.slice(0, splitted.length - 1).join('/')

  const { page, surround, navigation } = useDocusState()

  // Get navigation node from current path
  const file = fileFromPath(path, navigation.value)

  // Path queried has a page (and is not a directory)
  if (file && !file.children) {
    await Promise.all([
      queryContent().where({ id: file.id }).findOne() as Promise<ParsedContent>,
      queryContent(directory).findSurround(path) as Promise<ParsedContent[]>,
    ]).then(
      ([_page, _surround]) => {
        page.value = _page
        surround.value = _surround

        // Handle layout update from page
        if (_page?.layout)
          route.meta.layout = _page?.layout
        else
          route.meta.layout = 'default'
      },
    )
  }
  // Handle redirection in case the current path is not a page
  else if (file) {
    await navigateTo(findBottomLink(file))
  }
}

export const queryNavigation = async() => {
  const { navigation } = useDocusState()

  navigation.value = await fetchContentNavigation()
}

export const queryTheme = async() => {
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
