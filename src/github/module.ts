import { Module } from '@nuxt/types'
import defu from 'defu'
import { useStorage } from '../core/storage'
import { fetch } from './github'
import githubDefaults from './settings'

export default <Module>function docusGithubModule() {
  const settings = this.$docus.settings

  settings.github = defu(settings.github, githubDefaults)

  // Fetch releases
  fetch(settings.github).then(releases => {
    const { storage } = useStorage()

    storage.setItem('data:github-releases.json', {
      releases
    })
  })
}
