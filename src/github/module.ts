import { Module } from '@nuxt/types'
import defu from 'defu'
import { DocusSettings } from '../types/core'
import { get, fetch } from './github'
import githubDefaults from './settings'

export default <Module>function docusGithubModule() {
  const { nuxt } = this
  const { hook } = nuxt

  // Inject `docus` into ssrContext (for releases)
  // TODO: this could be removed when using $fetch with @nuxt/nitro to handle baseUrl with nuxt generate (using universal fetch)
  hook('vue-renderer:context', (ssrContext: any) => {
    ssrContext.docus = {
      releases: get()
    }
  })

  hook('docus:content:ready', ({ $content, settings }: { $content: any; settings: DocusSettings }) => {
    fetch({ $content, settings }).then(releases => {
      $content.database.items.insert({
        path: '/_docus/repo/github',
        releases
      })
    })
  })

  hook('docus:settings', (settings: DocusSettings) => {
    settings.github = defu(settings.github, githubDefaults)
  })
}
