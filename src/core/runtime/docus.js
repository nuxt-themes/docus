import Vue from 'vue'
import groupBy from 'lodash.groupby'
import { pascalCase } from 'scule'
import { joinURL, withTrailingSlash, withoutTrailingSlash } from 'ufo'
import { useCSSVariables, useDefaults, useDefaultsTheme } from '../../settings/settings'

const findLinkBySlug = (links, slug) => links.find(link => link.slug === slug)

export async function createDocus({
  app,
  ssrContext,
  $content,
  $contentLocalePath,
  route,
  nuxtState = {},
  beforeNuxtRender
}) {
  let $nuxt = null
  const $docus = new Vue({
    data() {
      if (nuxtState.docus) {
        return nuxtState.docus
      }
      const data = {
        page: {},
        categories: {},
        lastRelease: null,
        settings: null,
        theme: null,
        nav: {}
      }
      app.i18n.locales.forEach(({ code }) => {
        data.nav[code] = {}
      })
      return data
    },
    computed: {
      currentNav() {
        return this.nav[app.i18n.locale]
      },
      repoUrl() {
        return joinURL(this.settings.github.url, this.settings.github.repo)
      },
      previewUrl() {
        return withoutTrailingSlash(this.settings.url) + '/preview.png'
      },
      themeStyles() {
        return useCSSVariables(this.theme.colors, { code: 'prism' })
      }
    },
    methods: {
      async fetchJSON(name, fields) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { path, extension, ...data } = await $content(name)
          .only(fields)
          .fetch()
          .catch(() =>
            // eslint-disable-next-line no-console
            console.warn(`Please add a \`${name}.json\` file inside the \`content/\` folder to customize this theme.`)
          )
        return data
      },
      async fetch() {
        await this.fetchSettings()
        await Promise.all([this.fetchNavigation(), this.fetchCategories(), this.fetchLastRelease()])
      },

      async fetchSettings() {
        const settings = await this.fetchJSON('settings', [
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
        ])
        this.settings = useDefaults(settings)

        // load theme settings
        const theme = await this.fetchJSON('theme', ['colors'])
        this.theme = useDefaultsTheme(theme)

        // Update injected styles on HMR
        if (process.dev && process.client && window.$nuxt) {
          this.updateHead()
        }
      },
      async fetchNavigation() {
        // Avoid re-fetching in production
        if (process.dev === false && this.nav[app.i18n.locale].links) {
          return
        }
        const draft = this.ui?.draft ? undefined : false
        const fields = ['title', 'dir', 'nav', 'category', 'slug', 'version', 'to', 'icon', 'description', 'template']
        if (process.dev) {
          fields.push('draft')
        }
        const pages = await $content({ deep: true })
          .where({ language: app.i18n.locale, draft, nav: { $ne: false } })
          .only(fields)
          .sortBy('position', 'asc')
          .fetch()

        let depth = 0
        const links = []
        const getPageLink = page => ({
          slug: page.slug,
          to: withoutTrailingSlash(page.to),
          title: page.title,
          icon: page.icon,
          description: page.description,
          ...page.nav
        })
        // Add each page to navigation
        pages.forEach(page => {
          page.nav = page.nav || {}
          if (typeof page.nav === 'string') {
            page.nav = { slot: page.nav }
          }
          // Todo: ignore files directly from @nuxt/content
          if (page.slug.startsWith('_')) {
            return
          }
          // to: '/docs/guide/hello.md' -> dirs: ['docs', 'guide']
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
          page.dirs.forEach((dir, index) => {
            // If children has been disabled (nav.children = false)
            if (!currentLinks) {
              return
            }
            if (index > depth) {
              depth = index
            }
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
          if (!currentLinks) {
            return
          }
          // If index page, merge also with parent for metadata
          if (!page.slug) {
            if (page.dirs.length === 1) {
              page.nav.slot = page.nav.slot || 'header'
            }
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
        this.nav[app.i18n.locale] = {
          depth,
          links
        }
      },
      getPageTemplate(page) {
        let template = page.template?.self || page.template
        if (!template) {
          // fetch from nav (root to link) and fallback to settings.template
          const slugs = page.to.split('/').filter(Boolean).slice(0, -1) // no need to get latest slug since it is current page
          let links = this.currentNav.links || []
          slugs.forEach(slug => {
            const link = findLinkBySlug(links, slug)
            if (link?.template) {
              template = typeof link.template === 'string' ? `${link.template}-post` : link.template?.nested
            }
            if (!link.children) {
              return
            }
            links = link.children
          })
          template = template || this.settings.template
        }
        template = pascalCase(template)
        if (!Vue.component(template)) {
          // eslint-disable-next-line no-console
          console.error(`Template ${template} does not exists, fallback to Page template.`)
          template = 'Page'
        }
        return template
      },
      async fetchCategories() {
        // Avoid re-fetching in production
        if (process.dev === false && this.categories[app.i18n.locale]) {
          return
        }
        const draft = this.ui?.draft ? undefined : false
        const fields = ['title', 'menuTitle', 'category', 'slug', 'version', 'to', 'icon']
        if (process.dev) {
          fields.push('draft')
        }
        const docs = await $content({ deep: true })
          .where({ language: app.i18n.locale, draft, menu: { $ne: false } })
          .only(fields)
          .sortBy('position', 'asc')
          .fetch()

        if (this.settings.github.releases) {
          docs.push({ slug: 'releases', title: 'Releases', category: 'Community', to: '/releases' })
        }
        this.$set(this.categories, app.i18n.locale, groupBy(docs, 'category'))
      },

      // eslint-disable-next-line require-await
      async fetchReleases() {
        if (process.server) {
          return ssrContext.docus.releases
        }

        // TODO: Fix this
        // const repo = await $content('/_docus/repo/github').fetch()
        // return repo.releases

        return []
      },

      async fetchLastRelease() {
        if (process.dev === false && this.lastRelease) {
          return
        }
        const [lastRelease] = await this.fetchReleases()
        if (lastRelease) {
          this.lastRelease = lastRelease.name
        }
      },

      updateHead() {
        // Update when editing content/settings.json
        if (process.dev && process.client && window.$nuxt) {
          const style = window.$nuxt.$options.head.style.find(s => s.hid === 'docus-theme')
          if (style) {
            style.cssText = this.themeStyles
            window.$nuxt.$meta().refresh()
          }
          return
        }

        // Add head keys
        if (!Array.isArray(app.head.style)) {
          app.head.style = []
        }
        if (!Array.isArray(app.head.meta)) {
          app.head.meta = []
        }
        app.head.style.push({
          hid: 'docus-theme',
          cssText: this.themeStyles,
          type: 'text/css'
        })

        app.head.meta = app.head.meta.filter(s => s.hid !== 'apple-mobile-web-app-title')
        app.head.meta.push({
          hid: 'apple-mobile-web-app-title',
          name: 'apple-mobile-web-app-title',
          content: this.settings.title
        })
        app.head.meta = app.head.meta.filter(s => s.hid !== 'theme-color')
        app.head.meta.push({ hid: 'theme-color', name: 'theme-color', content: this.theme.colors.primary })
      },
      isLinkActive(to) {
        const path = $nuxt?.$route.path || route.path
        return withTrailingSlash(path) === withTrailingSlash($contentLocalePath(to))
      }
    }
  })

  if (process.server) {
    await $docus.fetch()
    beforeNuxtRender(({ nuxtState }) => {
      nuxtState.docus = $docus.$data
    })
  }

  // SPA Fallback
  if (process.client && !$docus.settings) {
    await $docus.fetch()
  }

  // HotReload on development
  if (process.client && process.dev) {
    window.onNuxtReady(() => {
      window.$nuxt.$on('content:update', () => $docus.fetch())
    })
  }

  // Workaround for Nuxt 2 using async layout inside the page
  // https://github.com/nuxt/nuxt.js/issues/3510#issuecomment-736757419
  if (process.client) {
    window.onNuxtReady(nuxt => {
      $nuxt = nuxt
      // Workaround since in full static mode, asyncData is not called anymore
      app.router.beforeEach(async (_, __, next) => {
        const payload = nuxt._pagePayload || {}
        payload.data = payload.data || []
        if (payload.data[0]?.page?.template && typeof Vue.component(payload.data[0].page.template) === 'function') {
          // Preload the component on client-side navigation
          await Vue.component(payload.data[0].page.template)()
        }
        next()
      })
    })
  }

  // Update app head, Inject colors as css variables
  $docus.updateHead()

  return $docus
}
