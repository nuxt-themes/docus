import Vue from 'vue'
import groupBy from 'lodash.groupby'
import { joinURL, withoutTrailingSlash } from 'ufo'
import { useColors, useDefaults } from '../utils/settings'

export default async function ({ app, ssrContext, $content, $config, nuxtState = {}, beforeNuxtRender }, inject) {
  const $docus = new Vue({
    data () {
      return nuxtState.docus || {
        categories: {},
        settings: null
      }
    },
    computed: {
      repoUrl () {
        return joinURL(this.settings.github.url, this.settings.github.repo)
      },
      previewUrl () {
        return withoutTrailingSlash(this.settings.url) + '/preview.png'
      },
      themeStyles () {
        const colors = useColors(this.settings.colors)
        const styles = colors.map(([color, map]) => {
          return Object.entries(map).map(([variant, value]) => {
            return `--${color}-${variant}: ${value};`
          }).join('')
        }).join('')
        return `:root {${styles}}`
      }
    },
    methods: {
      async fetch () {
        await this.fetchSettings()
        await Promise.all([
          this.fetchCategories()
        ])
      },
      async fetchSettings () {
        const { path, extension, ...settings } = await $content('settings').only(['title', 'url', 'logo', 'layout', 'twitter', 'github', 'algolia', 'colors']).fetch().catch((e) => {
          // eslint-disable-next-line no-console
          console.warn('Please add a `settings.json` file inside the `content/` folder to customize this theme.')
        })
        if (typeof settings.github === 'string') {
          settings.gitub = { repo: settings.github }
        }
        // backward compat for 'single' layout
        if (settings.layout === 'single') {
          settings.layout = 'readme'
        }
        this.settings = useDefaults(settings)
        // Update injected styles on HMR
        if (process.dev && process.client) {
          this.addThemeStyles()
        }
      },
      async fetchCategories () {
        // Avoid re-fetching in production
        if (process.dev === false && this.categories[app.i18n.locale]) {
          return
        }
        const draft = this.ui?.draft ? undefined : false
        const fields = ['title', 'menuTitle', 'category', 'slug', 'version', 'to']
        if (process.dev) {
          fields.push('draft')
        }
        const docs = await $content({ deep: true })
          .where({ language: app.i18n.locale, draft })
          .only(fields)
          .sortBy('position', 'asc')
          .fetch()

        if (this.settings.github.releases) {
          docs.push({ slug: 'releases', title: 'Releases', category: 'Community', to: '/releases' })
        }
        this.categories[app.i18n.locale] = groupBy(docs, 'category')
      },

      addThemeStyles () {
        if (!Array.isArray(app.head.style)) {
          app.head.style = []
        }
        // Avoid duplicates (seems vue-meta don't handle it for style)
        app.head.style = app.head.style.filter(s => s.hid !== 'docus-theme')
        app.head.style.push({
          hid: 'docus-theme',
          cssText: this.themeStyles,
          type: 'text/css'
        })
      }
    }
  })

  if (process.server) {
    await $docus.fetch()
    beforeNuxtRender(({ nuxtState }) => {
      nuxtState.docus = $docus.$data
    })
  }
  // Spa Fallback
  if (process.client && !$docus.settings) {
    await $docus.fetch()
  }
  // Hot reload on development
  if (process.client && process.dev) {
    window.onNuxtReady(() => {
      window.$nuxt.$on('content:update', () => $docus.fetch())
    })
  }

  // Inject colors as css variables
  $docus.addThemeStyles()

  inject('docus', $docus)
}
