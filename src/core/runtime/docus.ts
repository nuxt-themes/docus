import Vue from 'vue'
import { pascalCase } from 'scule'
import { joinURL, withTrailingSlash, withoutTrailingSlash } from 'ufo'
import { Context } from '@nuxt/types'
import { computed, reactive, toRefs } from '@nuxtjs/composition-api'
import { DocusSettings } from '../../types'

const findLinkBySlug = (links: any[], slug: string) => links.find(link => link.slug === slug)

type PermissiveContext = Context & { [key: string]: any }

type DocusState = {
  page: any
  categories: any
  lastRelease: any
  settings: any
  theme: any
  ui: any
  nav: any
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
    nav: {}
  }) as DocusState

  // Map locales to nav
  app.i18n.locales.forEach((locale: any) => (state.nav[locale.code] = {}))

  /**
   * Computed references
   */

  const currentNav = computed(() => state.nav[app.i18n.locale])

  const previewUrl = computed(() => withoutTrailingSlash(state.settings.url) + '/preview.png')

  const repoUrl = computed(() => joinURL(state.settings.github.url, state.settings.github.repo))

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
  }

  async function fetch() {
    fetchSettings()

    await Promise.all([fetchNavigation(), fetchLastRelease()])
  }

  async function fetchNavigation() {
    // TODO: Maybe remove this
    // Avoid re-fetching in production
    if (process.dev === false && state.nav[app.i18n.locale].links) return

    // Get fields
    const draft = state.ui?.draft ? undefined : false
    const fields = [
      'title',
      'menu',
      'menuTitle',
      'dir',
      'nav',
      'category',
      'slug',
      'version',
      'to',
      'icon',
      'description',
      'template'
    ]
    if (process.dev) fields.push('draft')

    // Query pages
    const pages = await search({ deep: true })
      .where({ language: app.i18n.locale, draft, nav: { $ne: false } })
      .only(fields)
      .sortBy('position', 'asc')
      .fetch()

    let depth = 0

    const links = []

    const getPageLink = (page: any) => ({
      slug: page.slug,
      to: withoutTrailingSlash(page.to || page.slug),
      menu: page.menu,
      menuTitle: page.menuTitle,
      template: page.template,
      title: page.title,
      icon: page.icon,
      description: page.description,
      ...page.nav
    })

    // Add each page to navigation
    pages.forEach((page: any) => {
      page.nav = page.nav || {}

      if (typeof page.nav === 'string') page.nav = { slot: page.nav }

      // TODO: Ignore files directly from @nuxt/content
      if (page.slug.startsWith('_')) return

      // To: '/docs/guide/hello.md' -> dirs: ['docs', 'guide']
      page.dirs = withoutTrailingSlash(page.to)
        .split('/')
        .filter(_ => _)

      // Remove the file part (except if index.md)
      if (page.slug !== '') page.dirs = page.dirs.slice(0, -1)

      if (!page.dirs.length) {
        page.nav.slot = page.nav.slot || 'header'
        return links.push(getPageLink(page))
      }

      let currentLinks = links

      let link = null

      page.dirs.forEach((dir: string, index: number) => {
        // If children has been disabled (nav.children = false)
        if (!currentLinks) return
        if (index > depth) depth = index

        link = findLinkBySlug(currentLinks, dir)

        if (link) {
          currentLinks = link.children
        } else {
          link = {
            slug: dir,
            children: []
          }
          currentLinks.push(link)
          currentLinks = currentLinks[currentLinks.length - 1].children
        }
      })

      if (!currentLinks) return

      // If index page, merge also with parent for metadata
      if (!page.slug) {
        if (page.dirs.length === 1) page.nav.slot = page.nav.slot || 'header'

        Object.assign(link, getPageLink(page))
      } else {
        // Push page
        currentLinks.push(getPageLink(page))
      }
    })

    // Increment navDepth for files
    depth++

    // Assign to $docus
    state.nav[app.i18n.locale] = {
      depth,
      links
    }

    // calculate categories based on nav
    const slugToTitle = title => title && title.replace(/-/g, ' ').split(' ').map(pascalCase).join(' ')
    const danglingLinks = []
    const categories = state.nav[app.i18n.locale].links
      .filter(link => link.menu !== false)
      .reduce((acc, link) => {
        link = { ...link }
        // clean up children from menu
        if (link.children) {
          link.children = link.children
            .filter(l => l.menu !== false)
            // Flatten sub-categories
            .flatMap(child => (child.to ? child : child.children))
            .flatMap(child => (child.to ? child : child.children))
            .filter(l => l.to)
        }
        // ensure link has proper `menuTitle`
        if (!link.menuTitle) {
          link.menuTitle = link.title || slugToTitle(link.slug) || ''
        }

        if (link.children && link.children.length) {
          acc.push(link)
        } else if (link.to) {
          danglingLinks.push(link)
        }
        return acc
      }, [])

    // Push other links to end of list
    if (danglingLinks.length) categories.push({ to: '', children: danglingLinks })
    state.categories[app.i18n.locale] = categories
  }

  function getPageTemplate(page: any) {
    let template = page.template?.self || page.template

    if (!template) {
      // Fetch from nav (root to link) and fallback to settings.template
      const slugs = page.to.split('/').filter(Boolean).slice(0, -1) // no need to get latest slug since it is current page

      let links = currentNav.value.links || []

      slugs.forEach((slug: string) => {
        const link = findLinkBySlug(links, slug)
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

  async function fetchReleases() {
    return (await data('github-releases')).releases
  }

  async function fetchLastRelease() {
    if (process.dev === false && state.lastRelease) return

    const [lastRelease] = await fetchReleases()

    if (lastRelease) state.lastRelease = lastRelease.name
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
  if (process.client && process.dev) window.onNuxtReady(() => window.$nuxt.$on('content:update', fetch))

  // Fetch on server
  if (process.server) {
    await fetch()

    beforeNuxtRender(({ nuxtState }) => (nuxtState.docus = state))
  }

  // SPA Fallback
  if (process.client && !state.settings) await fetch()

  return {
    ...toRefs(state),
    currentNav,
    previewUrl,
    repoUrl,
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
