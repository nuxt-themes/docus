import { Module } from '@nuxt/types'
import defu from 'defu'
import { ParserOptions } from '../types'
import { useStorage } from '../core/storage'
import { fetch } from './github'
import githubDefaults from './settings'

export default <Module>function docusGithubModule() {
  const { nuxt } = this
  const { hook } = nuxt
  const settings = this.$docus.settings

  settings.github = defu(settings.github, githubDefaults)
  const repository = typeof settings.github.releases === 'string' ? settings.github.releases : settings.github.repo

  hook('docus:parserOptions', (options: Partial<ParserOptions>) => {
    if (!options.markdown.remarkPlugins) {
      options.markdown.remarkPlugins = []
    }

    options.markdown.remarkPlugins.push([
      'remark-github',
      {
        repository
      }
    ])
  })

  hook('docus:storage:ready', () => {
    // Fetch releases
    fetch(settings.github).then(releases => {
      const { storage } = useStorage()

      storage.setItem('data:github-releases.json', {
        releases
      })
    })
  })
}
