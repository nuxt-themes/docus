import { withTrailingSlash } from 'ufo'
import { ref, computed } from '@nuxtjs/composition-api'
import { DocusAddonContext, DocusNavigationGetParameters, NavItem } from '../../../types'
import { useReactivePath } from './reactivePath'
import { useDocusTemplates } from './templates'

/**
 * Handling all the navigation querying logic.
 */
export const useDocusNavigation = ({ context, state, api }: DocusAddonContext) => {
  // Nuxt context
  const { app, route } = context

  // Current locale
  const { locale: currentLocale } = app.i18n

  // Reactive router path
  const { path } = useReactivePath(app, route)

  // Init navigation object if not preset
  if (!state.navigation) state.navigation = {}

  // Map locales to nav
  app.i18n.locales.forEach((locale: any) => (state.navigation[locale.code] = []))

  // Compute `currentNav` on every route change
  const fetchCounter = ref(0)

  /**
   * Get navigation from Docus data
   */
  async function fetchNavigation() {
    const { body } = await api.data('/docus/navigation/' + currentLocale)

    state.navigation[currentLocale] = body

    fetchCounter.value += 1
  }

  /**
   * Query navigation from and to a certain point using parameters.
   * @param depth The depth at which you want to go into children.
   * @param locale The locale used for that query. (defaults to the current user locale)
   * @param from A vue-router "to" valid path to start with: "/directory" will make my query start at from this directory.
   */
  function get({ depth, locale, from, all }: DocusNavigationGetParameters = {}) {
    const nav = state.navigation[locale || currentLocale] || []

    let items = nav

    // `from` parameter handling
    if (from) {
      const paths = from.split('/')

      items = paths.reduce((links: NavItem[], path: string, index: number) => {
        // Empty path, skip iteration
        if (!path) return links

        // If we iterated on the latest path, return links
        if (index + 1 === paths.length) return links

        // If this path links are only 1 long, set the current path children as root
        if (links.length === 1) return links[0].children

        // Otherwise, find matching path and get its childrens
        const match = links.find(item => item.to.split('/')[index] === path)
        if (match) return match.children

        return links
      }, items)
    }

    // Start filtering loop
    return all ? items : filterLinks(items, depth, 1)
  }

  /**
   * Filter a list of nodes.
   */
  function filterLinks(nodes: NavItem[], maxDepth: number, currentDepth: number) {
    return nodes.filter(node => {
      // Navigation as false means that we want that link to be hidden from navigation.
      if (node.navigation === false) return false

      // We don't want to show drafts.
      if (node.draft === true) return false

      // Check if we aren't to deep
      if (currentDepth && maxDepth > currentDepth) return false

      // Check if marked as nested, if so children will be empty
      if (node.navigation.nested === false) node.children = []

      // Loop on current node children if exists
      node.children =
        node.children && node.children.length > 0 ? filterLinks(node.children, maxDepth, currentDepth + 1) : []

      return node
    })
  }

  /**
   * Check if a "to" path is the currently active path.
   */
  function isLinkActive(to: string) {
    return withTrailingSlash(path.value) === withTrailingSlash(context.$contentLocalePath(to))
  }

  /**
   * Return the current navigation from the current user path.
   */
  const currentNav = computed(() => {
    // eslint-disable-next-line no-unused-expressions
    fetchCounter.value

    // Get links from path
    const links = get({
      from: path.value,
      all: true
    })

    // Get current link
    const currentLink = links.find(link => link.to === path.value)

    // Return filtered items for exclusive page
    if (currentLink && currentLink.navigation && currentLink.navigation.exclusive) return links

    // Return whole navigation
    return get()
  })

  // Update content on update.
  if (process.client) {
    window.onNuxtReady($nuxt => {
      $nuxt.$on('content:update', () => {
        fetchNavigation()
      })
    })
  }

  const { getPageTemplate } = useDocusTemplates({ api, state }, currentNav)

  return {
    getPageTemplate,
    fetchNavigation,
    currentNav,
    isLinkActive,
    init: fetchNavigation,
    get
  }
}
