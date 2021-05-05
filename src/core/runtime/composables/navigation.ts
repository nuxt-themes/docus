import { DocusAddonContext } from 'src/types'
import { pascalCase } from 'scule'
import { withTrailingSlash } from 'ufo'
import { computed } from '@nuxtjs/composition-api'
import Vue from 'vue'

export const useDocusNavigation = ({ $nuxt, context, state, api }: DocusAddonContext) => {
  const { app, route } = context
  const { locale } = app.i18n
  if (!state.navigation) state.navigation = {}

  const fetchNavigation = async () => {
    const { body } = await api.data('/docus/navigation/' + locale)
    state.navigation[locale] = body
  }

  function getNavigation({ depth, locale, from }: { depth?: number; locale?: string; from?: string }) {
    const nav = state.navigation[locale]
    const paths = from.split('/')
    from = paths.slice(0, paths.length - 1).join('/')
    let links = nav

    if (from) {
      const link = links.find(link => link.to === from)
      if (link.nav.hideOthers) {
        links = [link]
      }
    }

    const filters = [(link, _linkDepth) => link.meta.menu !== false]
    if (depth) {
      filters.push((_, linkDepth) => linkDepth <= depth)
    }

    function filterLinks(nodes, linkDepth) {
      return nodes.filter(node => {
        if (!filters.some(filter => filter(node, linkDepth))) {
          return false
        }
        node.children = filterLinks(node.children, linkDepth + 1)
        return node
      })
    }
    return filterLinks(links, 1)
  }

  // Map locales to nav
  app.i18n.locales.forEach((locale: any) => (state.navigation[locale.code] = {}))

  const currentNav = computed(() =>
    getNavigation({
      locale: app.i18n.locale,
      from: route.path
    })
  )

  function getPageTemplate(page: any) {
    let template = page.template?.self || page.template

    if (!template) {
      // Fetch from nav (root to link) and fallback to settings.template
      const slugs = page.to.split('/').filter(Boolean).slice(0, -1) // no need to get latest slug since it is current page

      let links = currentNav.value.links || []

      slugs.forEach((slug: string) => {
        const link = api.findLinkBySlug(links, slug)

        if (link?.template) {
          template = typeof link.template === 'string' ? `${link.template}-post` : link.template?.nested
        }

        if (!link?.children) {
          return
        }

        links = link.children
      })

      template = template || state.settings.template
    }

    template = pascalCase(template)

    if (!Vue.component(template)) {
      // eslint-disable-next-line no-console
      console.error(`Template ${template} does not exists, fallback to Page template.`)

      template = 'Page'
    }

    return template
  }

  function isLinkActive(to: string) {
    const path = $nuxt?.$route.path || context.route.path

    return withTrailingSlash(path) === withTrailingSlash(context.$contentLocalePath(to))
  }

  return {
    getPageTemplate,
    fetchNavigation,
    currentNav,
    isLinkActive,
    init: fetchNavigation
  }
}
