import Vue from 'vue'
import { pascalCase } from 'scule'
import { joinURL, withTrailingSlash, withoutTrailingSlash } from 'ufo'
import { Context } from '@nuxt/types'
import { computed, reactive, toRefs } from '@nuxtjs/composition-api'
import { DocusSettings } from '../../types'
import { useCSSVariables } from '../utils/css'

const findLink = (links: any[], to: string) => links.find(link => link.to === to)

type PermissiveContext = Context & { [key: string]: any }

type DocusState = {
  page: any
  categories: any
  lastRelease: any
  settings: any
  theme: any
  ui: any
  navigation: any
}

export const createDocus = async (
  { app, $contentLocalePath, route, beforeNuxtRender }: PermissiveContext,
  settings: DocusSettings,
  createQuery: any
) => {
  // Local instance let
  let $nuxt

  /**
   * State
   */

  const state = reactive({
    page: {},
    categories: {},
    lastRelease: null,
    settings: null,
    theme: null,
    ui: null,
    // navigation states
    navigation: {}
  }) as DocusState

  // Map locales to nav
  app.i18n.locales.forEach((locale: any) => (state.navigation[locale.code] = {}))

  /**
   * Computed references
   */

  const currentNav = computed(() =>
    getNavigation({
      locale: app.i18n.locale,
      from: route.path
    })
  )

  const previewUrl = computed(() => withoutTrailingSlash(state.settings.url) + '/preview.png')

  const repoUrl = computed(() => joinURL(state.settings.github.url, state.settings.github.repo))

  const styles = computed(() => useCSSVariables(state.theme.colors, { code: 'prism' }))

  /**
   * Methods
   */

  function data(path: string) {
    return createQuery(joinURL('/data', path), {}).fetch()
  }

  function search(path: string | any, options?) {
    if (typeof path !== 'string') {
      options = path
      path = ''
    }
    return createQuery(joinURL('/pages', path), options)
  }

  function page(path: string) {
    return this.search(path).fetch()
  }

  function fetchSettings() {
    const { theme, ...userSettings } = settings

    state.settings = userSettings
    state.theme = theme

    // Update injected styles on HMR
    if (process.dev && process.client && window.$nuxt) updateHead()
  }

  async function fetch() {
    fetchSettings()

    await Promise.all([fetchNavigation(), fetchLastRelease()])
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

  async function fetchNavigation() {
    const { locale } = app.i18n
    const { body } = await data('/docus/navigation/' + locale)

    state.navigation[locale] = body
  }

  function getPageTemplate(page: any) {
    let template = page.template?.self || page.template

    if (!template) {
      // Fetch from nav (root to link) and fallback to settings.template
      const slugs = page.to.split('/').filter(Boolean).slice(0, -1) // no need to get latest slug since it is current page

      let links = state.navigation.links || []
      slugs.forEach((_: string, index: number) => {
        const link = findLink(links, '/' + slugs.slice(0, index + 1))
        if (link?.template) {
          template = typeof link.meta.template === 'string' ? `${link.meta.template}-post` : link.meta.template?.nested
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

  async function fetchReleases() {
    const repo = await data('github-releases')
    return repo.releases
  }

  async function fetchLastRelease() {
    if (process.dev === false && state.lastRelease) return

    const [lastRelease] = await fetchReleases()

    if (lastRelease) state.lastRelease = lastRelease.name
  }

  function updateHead() {
    const head = typeof app.head === 'function' ? app.head() : app.head

    // Update when editing content/settings.json
    if (process.dev && process.client && window.$nuxt) {
      const style = head.style.find(s => s.hid === 'docus-theme')

      if (style) {
        style.cssText = styles.value
        window.$nuxt.$meta().refresh()
      }

      return
    }

    // Add head keys
    if (!Array.isArray(head.style)) {
      head.style = []
    }

    if (!Array.isArray(head.meta)) {
      head.meta = []
    }

    head.style.push({
      hid: 'docus-theme',
      cssText: styles.value,
      type: 'text/css'
    })

    head.meta = head.meta.filter(s => s.hid !== 'apple-mobile-web-app-title')

    head.meta.push({
      hid: 'apple-mobile-web-app-title',
      name: 'apple-mobile-web-app-title',
      content: state.settings.title
    })

    head.meta = head.meta.filter(s => s.hid !== 'theme-color')

    head.meta.push({ hid: 'theme-color', name: 'theme-color', content: state.theme.colors.primary })
  }

  function isLinkActive(to: string) {
    const path = $nuxt?.$route.path || route.path
    return withTrailingSlash(path) === withTrailingSlash($contentLocalePath(to))
  }

  /**
   * Hooks and injection
   */

  if (process.client) {
    window.onNuxtReady((nuxt: any) => {
      $nuxt = nuxt

      // Workaround since in full static mode, asyncData is not called anymore
      app.router.beforeEach((_: any, __: any, next: any) => {
        const payload = nuxt._pagePayload || {}

        payload.data = payload.data || []

        if (payload.data[0]?.page?.template && typeof Vue.component(payload.data[0].page.template) === 'function') {
          // Preload the component on client-side navigation
          Vue.component(payload.data[0].page.template)
        }

        next()
      })
    })
  }

  // HotReload on development
  if (process.client && process.dev) {
    window.onNuxtReady(() => window.$nuxt.$on('content:update', fetch))
  }

  if (process.server) {
    await fetch()

    beforeNuxtRender(({ nuxtState }) => (nuxtState.docus = state))
  }

  // SPA Fallback
  if (process.client && !state.settings) await fetch()

  updateHead()

  return {
    ...toRefs(state),
    currentNav,
    previewUrl,
    repoUrl,
    styles,
    isLinkActive,
    getPageTemplate,
    fetchLastRelease,
    fetchNavigation,
    fetchReleases,
    fetchSettings,
    fetch,
    search,
    page,
    data
  }
}
