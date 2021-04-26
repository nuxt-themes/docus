import Vue from 'vue'
import groupBy from 'lodash.groupby'
import { pascalCase } from 'scule'
import { joinURL, withTrailingSlash, withoutTrailingSlash } from 'ufo'
import { Context } from '@nuxt/types'
import { computed, reactive, set, toRefs } from '@nuxtjs/composition-api'
import { DocusSettings } from 'src/types'
import { useCSSVariables, useDefaults, useDefaultsTheme } from '../../settings/settings'

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

export const createDocus = async ({
  app,
  ssrContext,
  $content,
  $contentLocalePath,
  route,
  nuxtState = {},
  beforeNuxtRender
}: PermissiveContext) => {
  // Local instance let
  let $nuxt

  /**
   * State
   */

  const state = reactive(
    nuxtState.docus || {
      page: {},
      categories: {},
      lastRelease: null,
      settings: null,
      theme: null,
      ui: null,
      nav: {}
    }
  ) as DocusState

  // Map locales to nav
  app.i18n.locales.forEach((locale: any) => (state.nav[locale.code] = {}))

  /**
   * Computed references
   */

  const currentNav = computed(() => state.nav[app.i18n.locale])

  const previewUrl = computed(() => withoutTrailingSlash(state.settings.url) + '/preview.png')

  const repoUrl = computed(() => joinURL(state.settings.github.url, state.settings.github.repo))

  const styles = computed(() => useCSSVariables(state.theme.colors, { code: 'prism' }))

  /**
   * Methods
   */

  async function fetchJSON(name: string, fields: any[]) {
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { path, extension, ...data } = await $content(name)
      .only(fields)
      .fetch()
      .catch(() =>
        // eslint-disable-next-line no-console
        console.warn(`Please add a \`${name}.json\` file inside the \`content/\` folder to customize this theme.`)
      )

    return data
  }

  async function fetchSettings() {
    const settings = (await fetchJSON('settings', [
      'title',
      'url',
      'logo',
      'template',
      'header',
      'twitter',
      'github',
      'algolia',
      'colors',
      'credits'
    ])) as Partial<DocusSettings>
    state.settings = useDefaults(settings)

    // Load theme settings
    const theme = await fetchJSON('theme', ['colors'])
    state.theme = useDefaultsTheme(theme)

    // Update injected styles on HMR
    if (process.dev && process.client && window.$nuxt) updateHead()
  }

  async function fetch() {
    await fetchSettings()

    await Promise.all([fetchNavigation(), fetchCategories(), fetchLastRelease()])
  }

  async function fetchNavigation() {
    // TODO: Maybe remove this
    // Avoid re-fetching in production
    if (process.dev === false && state.nav[app.i18n.locale].links) return

    // Get fields
    const draft = state.ui?.draft ? undefined : false
    const fields = ['title', 'dir', 'nav', 'category', 'slug', 'version', 'to', 'icon', 'description', 'template']
    if (process.dev) fields.push('draft')

    // Query pages
    const pages = await $content({ deep: true })
      .where({ language: app.i18n.locale, draft, nav: { $ne: false } })
      .only(fields)
      .sortBy('position', 'asc')
      .fetch()

    let depth = 0

    const links = []

    const getPageLink = (page: any) => ({
      slug: page.slug,
      to: withoutTrailingSlash(page.to),
      title: page.title,
      icon: page.icon,
      description: page.description,
      ...page.nav
    })

    // Add each page to navigation
    pages.forEach((page: any) => {
      page.nav = page.nav || {}

      if (typeof page.nav === 'string') {
        page.nav = { slot: page.nav }
      }

      // TODO: Ignore files directly from @nuxt/content
      if (page.slug.startsWith('_')) {
        return
      }

      // To: '/docs/guide/hello.md' -> dirs: ['docs', 'guide']
      page.dirs = withoutTrailingSlash(page.to)
        .split('/')
        .filter(_ => _)

      // Remove the file part (except if index.md)
      if (page.slug !== '') {
        page.dirs = page.dirs.slice(0, -1)
      }

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

        Object.assign(link, {
          to: withoutTrailingSlash(page.to),
          title: page.title,
          template: page.template,
          icon: page.icon,
          description: page.description,
          ...page.nav
        })
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
        if (!link.children) {
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

  async function fetchCategories() {
    // TODO: Maybe remove this
    // Avoid re-fetching in production
    if (process.dev === false && state.categories[app.i18n.locale]) return

    const draft = state.ui?.draft ? undefined : false
    const fields = ['title', 'menuTitle', 'category', 'slug', 'version', 'to', 'icon']
    if (process.dev) fields.push('draft')

    const docs = await $content({ deep: true })
      .where({ language: app.i18n.locale, draft, menu: { $ne: false } })
      .only(fields)
      .sortBy('position', 'asc')
      .fetch()

    if (state.settings.github.releases) {
      docs.push({ slug: 'releases', title: 'Releases', category: 'Community', to: '/releases' })
    }

    set(state.categories, app.i18n.locale, groupBy(docs, 'category'))
  }

  // eslint-disable-next-line require-await
  async function fetchReleases() {
    if (process.server) return (ssrContext as any).docus.releases

    // TODO: Fix this
    // const repo = await $content('/_docus/repo/github').fetch()
    // return repo.releases

    return []
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
      app.router.beforeEach(async (_: any, __: any, next: any) => {
        const payload = nuxt._pagePayload || {}

        payload.data = payload.data || []

        if (payload.data[0]?.page?.template && typeof Vue.component(payload.data[0].page.template) === 'function') {
          // Preload the component on client-side navigation
          await app.component(payload.data[0].page.template)()
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

    beforeNuxtRender(({ nuxtState }) => {
      nuxtState.docus = state
    })
  }

  // SPA Fallback
  if (process.client && !state.settings) {
    await fetch()
  }

  updateHead()

  return {
    ...toRefs(state),
    currentNav,
    previewUrl,
    repoUrl,
    styles,
    isLinkActive,
    getPageTemplate,
    fetchJSON,
    fetchCategories,
    fetchLastRelease,
    fetchNavigation,
    fetchReleases,
    fetchSettings,
    fetch
  }
}

export default createDocus
