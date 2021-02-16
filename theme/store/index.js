import Vue from 'vue'
import groupBy from 'lodash.groupby'
import defu from 'defu'

export const state = () => ({
  categories: {},
  releases: [],
  settings: {
    title: 'Docus',
    url: '',
    github: {
      repo: '',
      branch: '',
      url: 'https://github.com',
      apiUrl: 'https://api.github.com',
      dir: ''
    },
    filled: false
  }
})

export const getters = {
  settings (state) {
    return state.settings
  },
  releases (state) {
    return state.releases
  },
  lastRelease (state) {
    return state.releases[0]
  },
  repositoryUrl (state) {
    return `${state.settings.github.url}/${state.settings.github.repo}`
  }
}

export const mutations = {
  SET_CATEGORIES (state, categories) {
    // Vue Reactivity rules since we add a nested object
    Vue.set(state.categories, this.$i18n.locale, categories)
  },
  SET_RELEASES (state, releases) {
    state.releases = releases
  },
  SET_DEFAULT_BRANCH (state, branch) {
    state.settings.github.branch = branch
  },
  SET_SETTINGS (state, settings) {
    if (typeof settings.github === 'string') {
      settings.github = {
        repo: settings.github
      }
    }

    state.settings = defu({ filled: true }, settings, state.settings)

    if (!state.settings.url) {
      // eslint-disable-next-line no-console
      console.warn('Please provide the `url` property in `content/setting.json`')
    }
  }
}

export const actions = {
  async fetchCategories ({ commit, state }) {
    // Avoid re-fetching in production
    if (process.dev === false && state.categories[this.$i18n.locale]) {
      return
    }
    const docs = await this.$content('/', { deep: true })
      .where({ language: this.$i18n.locale })
      .only(['title', 'menuTitle', 'category', 'slug', 'version', 'to'])
      .sortBy('position', 'asc')
      .fetch()

    if (state.releases.length > 0) {
      docs.push({ slug: 'releases', title: 'Releases', category: 'Community', to: '/releases' })
    }
    const categories = groupBy(docs, 'category')

    commit('SET_CATEGORIES', categories)
  },
  async fetchReleases ({ commit, state }) {
    if (!state.settings.github && !state.settings.github.repo) {
      return
    }

    const { apiUrl, repo } = state.settings.github

    const options = {}
    if (this.$config.githubToken) {
      options.headers = { Authorization: `token ${this.$config.githubToken}` }
    }
    let releases = []
    try {
      const data = await fetch(`${apiUrl}/${repo}/releases`, options).then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText)
        }
        return res
      }).then(res => res.json())
      releases = data.filter(r => !r.draft).map((release) => {
        return {
          name: (release.name || release.tag_name).replace('Release ', ''),
          date: release.published_at,
          body: this.$markdown(release.body)
        }
      })
    } catch (e) { }

    const getMajorVersion = r => r.name && Number(r.name.substring(1, 2))
    releases.sort((a, b) => {
      const aMajorVersion = getMajorVersion(a)
      const bMajorVersion = getMajorVersion(b)
      if (aMajorVersion !== bMajorVersion) {
        return bMajorVersion - aMajorVersion
      }
      return new Date(b.date) - new Date(a.date)
    })

    commit('SET_RELEASES', releases)
  },
  async fetchDefaultBranch ({ commit, state, getters }) {
    if ((!state.settings.github && !state.settings.github.repo) || state.settings.github.branch) {
      return
    }

    const { apiUrl, repo } = state.settings.github

    const options = {}
    if (this.$config.githubToken) {
      options.headers = { Authorization: `token ${this.$config.githubToken}` }
    }
    let defaultBranch
    try {
      const data = await fetch(`${apiUrl}/${repo}`, options).then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText)
        }
        return res
      }).then(res => res.json())
      defaultBranch = data.default_branch
    } catch (e) { }

    commit('SET_DEFAULT_BRANCH', defaultBranch || 'main')
  },
  async fetchSettings ({ commit }) {
    try {
      const { dir, extension, path, slug, to, createdAt, updatedAt, ...settings } = await this.$content('settings').fetch()

      commit('SET_SETTINGS', settings)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('You can add a `settings.json` file inside the `content/` folder to customize this theme.')
    }
  }
}
