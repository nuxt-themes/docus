import Vue from 'vue'
import defu from 'defu'
import groupBy from 'lodash.groupby'
import { joinURL, withoutTrailingSlash } from 'ufo'
import { $fetch } from 'ohmyfetch/node'
import { getColors } from 'theme-colors'
import { compile } from '../utils/markdown'

const DEFAULT_THEME_COLORS = {
  primary: '#06B6D4',
  code: '#8B5CF6'
}

export default async function ({ app, ssrContext, $content, $config, nuxtState = {}, beforeNuxtRender }, inject) {
  const $docus = new Vue({
    data () {
      return nuxtState.docus || {
        categories: {},
        releases: null,
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
      lastRelease () {
        return this.releases && this.releases[0]
      },
      themeStyles () {
        let colors
        try {
          colors = Object.entries(this.settings.colors).map(([key, color]) => [key, getColors(color)])
        } catch (e) {
          // eslint-disable-next-line no-console
          console.warn('Could not parse custom colors:', e.message)
          colors = Object.entries(DEFAULT_THEME_COLORS).map(([key, color]) => [key, getColors(color)])
        }
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
          this.fetchReleases(),
          this.fetchCategories()
        ])
      },
      async fetchSettings () {
        const defaults = {
          title: 'Docus',
          layout: 'docs',
          url: '',
          github: {
            repo: '',
            branch: '',
            url: 'https://github.com',
            apiUrl: 'https://api.github.com',
            dir: '',
            releases: true
          },
          colors: DEFAULT_THEME_COLORS,
          header: {
            logo: false,
            title: true
          }
        }
        const { path, extension, ...settings } = await $content('settings').only(['title', 'url', 'logo', 'layout', 'twitter', 'github', 'algolia', 'colors', 'header']).fetch().catch((e) => {
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
        this.settings = defu(settings, defaults)
        // Update injected styles on HMR
        if (process.dev && process.client) {
          this.addThemeStyles()
        }
      },
      async fetchReleases () {
        if (!this.settings.github && !this.settings.github.repo) {
          return
        }
        if (!this.settings.github.releases) {
          return
        }
        // If already has releases in dev (HMR, don't fetch again)
        if (this.releases && this.releases.length) {
          return
        }
        const { apiUrl, repo } = this.settings.github

        const options = {}
        if ($config.githubToken) {
          options.headers = { Authorization: `token ${$config.githubToken}` }
        }
        const url = `${apiUrl}/${repo}/releases`
        let releases = await $fetch(url, options).catch((err) => {
          // eslint-disable-next-line no-console
          console.warn(`Cannot fetch GitHub releases on ${url} [${err.response.status}]`)
          if (err.response.status === 403) {
            // eslint-disable-next-line no-console
            console.info('Make sure to provide GITHUB_TOKEN environment in `.env`')
          } else {
            // eslint-disable-next-line no-console
            console.info('To disable fetching releases, set `github.releases` to `false` in `content/settings.json`')
          }
          return []
        })
        releases = releases.filter(r => !r.draft).map((release) => {
          return {
            name: (release.name || release.tag_name).replace('Release ', ''),
            date: release.published_at,
            body: compile(release.body)
          }
        })

        const getMajorVersion = r => r.name && Number(r.name.substring(1, 2))
        releases.sort((a, b) => {
          const aMajorVersion = getMajorVersion(a)
          const bMajorVersion = getMajorVersion(b)
          if (aMajorVersion !== bMajorVersion) {
            return bMajorVersion - aMajorVersion
          }
          return new Date(b.date) - new Date(a.date)
        })

        this.releases = []
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

        if (this.lastRelease) {
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
