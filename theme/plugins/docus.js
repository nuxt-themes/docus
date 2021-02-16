import Vue from 'vue'
import defu from 'defu'
import groupBy from 'lodash.groupby'
import { joinURL, withoutTrailingSlash } from 'ufo'
import { $fetch } from 'ohmyfetch/node'
import { compile } from '../utils/markdown'

export default async function ({ app, $content, $config }, inject) {
  const $docus = new Vue({
    data () {
      return {
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
          }
        }
        const { path, extension, ...settings } = await $content('settings').only(['title', 'url', 'logo', 'layout', 'twitter', 'github', 'algolia']).fetch().catch((e) => {
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
            console.info('Make sure to provide GITHUB_TOKEN environment in \`.env\`')
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
        const docs = await $content(app.i18n.locale, { deep: true }).only(['title', 'menuTitle', 'category', 'slug', 'version', 'to']).sortBy('position', 'asc').fetch()
        if (this.lastRelease) {
          docs.push({ slug: 'releases', title: 'Releases', category: 'Community', to: '/releases' })
        }
        this.categories[app.i18n.locale] = groupBy(docs, 'category')
      }
    }
  })

  if (process.server) {
    await $docus.fetch()
  }
  // TODO: inject state and get back on client
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

  inject('docus', $docus)
}
