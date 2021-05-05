import { DocusAddonContext, DocusDocument, NavItem } from 'src/types'
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

  function get({ depth, locale, from }: { depth?: number; locale?: string; from?: string }) {
    const nav = state.navigation[locale]
    let items = nav

    if (from) {
      const paths = from.split('/')
      from = paths.slice(0, paths.length - 1).join('/')

      // todo
      // const link = items.find(link => link.to === from)
      // if (link.navigation.hideOthers) {
      //   items = [link]
      // }
      items = items.map(_ => _)
    }

    function filterLinks(nodes: NavItem[], linkDepth) {
      return nodes.filter(node => {
        if (node.navigation === false) {
          return false
        }
        if (depth && linkDepth > depth) {
          return false
        }
        if (node.navigation.nested === false) {
          node.children = []
        }
        node.children = filterLinks(node.children, linkDepth + 1)
        return node
      })
    }
    return filterLinks(items, 1)
  }

  // Map locales to nav
  app.i18n.locales.forEach((locale: any) => (state.navigation[locale.code] = []))

  const currentNav = computed(() =>
    get({
      locale: app.i18n.locale,
      from: route.path
    })
  )

  function getPageTemplate(page: DocusDocument) {
    let template = typeof page.template === 'string' ? page.template : page.template?.self

    if (!template) {
      // Fetch from nav (root to link) and fallback to settings.template
      const slugs: string[] = page.to.split('/').filter(Boolean).slice(0, -1) // no need to get latest slug since it is current page

      let links = currentNav.value || []

      slugs.forEach((_slug: string, index: number) => {
        // generate full path of parent
        const to = '/' + slugs.slice(0, index + 1).join('/')
        const link = api.findLink(links, to)

        if (link?.template) {
          template = link.template.nested
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
    init: fetchNavigation,
    get
  }
}
