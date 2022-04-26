import { withoutTrailingSlash } from 'ufo'
import type { NavItem, ParsedContent } from '@nuxt/content/dist/runtime/types'
import { computed, fetchContentNavigation, onBeforeUnmount, onMounted, queryContent, useNuxtApp, useRoute, useState } from '#imports'

let closeHook

export const useContent = () => {
  const route = useRoute()

  const path = computed(() => withoutTrailingSlash(route.path))

  /**
   * Navigation tree from root of app.
   */
  const navigation = useState<NavItem[]>('navigation', () => null)

  /**
   * Current page complete data.
   */
  const page = useState<ParsedContent>(`content-page-${path.value}`, () => null)

  /**
   * Previous and next page data.
   * Format: [prev, next]
   */
  const surround = useState<ParsedContent[]>(`content-surround-${path.value}`, () => null)

  /**
   * Table of contents from parsed page.
   */
  const toc = computed(() => page?.value?.body?.toc?.links || [])

  /**
   * Content type from parsed page.
   */
  const type = computed(() => page.value?.meta?.type)

  /**
   * Next page from `surround`.
   */
  const next = computed(() => surround.value?.[1] || null)

  /**
   * Previous page from `surround`.
   */
  const prev = computed(() => surround.value?.[0] || null)

  /**
   * Page list fetching helper.
   */
  const fetchDir = async(path: string) => await queryContent(path).find()

  /**
   * Find first child link from a navigation node.
   */
  const findBottomLink = (link: NavItem) => {
    let slug = link.slug

    if (link.children && link.children.length)
      slug = findBottomLink(link.children[0])

    return slug
  }

  /**
   * Find current navigation node from a path.
   */
  const navFromPath = (path: string, tree: NavItem[] = navigation.value) => {
    for (const file of tree) {
      if (file.children) {
        const result = navFromPath(path, file.children)
        if (result)
          return result
      }

      if (file.slug === path)
        return file
    }
  }

  /**
   * Navigation fetching helper.
   */
  const fetchNavigation = async(force = false) => {
    if (navigation.value !== null && !force)
      return

    navigation.value = await fetchContentNavigation()
  }

  /**
   * Local page fetching helper.
   */
  const fetchPage = async(force = false) => {
    if (page.value !== null && !force)
      return

    const splitted = path.value.split('/')
    const directory = splitted.slice(0, splitted.length - 1).join('/')

    // Get navigation node from current path
    const file = navFromPath(path.value, navigation.value)

    if (file && !file.children) {
      // Path queried has a page (and is not a directory)
      await Promise.all([
        queryContent().where({ id: file.id }).findOne() as Promise<ParsedContent>,
        queryContent(directory).findSurround(path.value) as Promise<ParsedContent[]>,
      ]).then(([_page, _surround]) => {
        page.value = _page
        surround.value = _surround
      })
    }
    else if (file) {
      navigateTo(findBottomLink(file))
    }
  }

  // Re-fetch page on change (development only)
  if (process.dev) {
    onMounted(
      () => {
        // Cleanup previous hook before registering new one.
        if (closeHook)
          closeHook()

        const { hook } = useNuxtApp()

        closeHook = hook('app:data:refresh', async() => {
          await fetchNavigation(true)
          await fetchPage(true)
        })
      },
    )
    onBeforeUnmount(() => closeHook && closeHook())
  }

  return {
    // useState references
    navigation,
    page,
    surround,
    // Fetching helpers
    fetchDir,
    fetchPage,
    fetchNavigation,
    // Computed values
    next,
    prev,
    type,
    toc,
    // Methods
    navFromPath,
    findBottomLink,
  }
}
