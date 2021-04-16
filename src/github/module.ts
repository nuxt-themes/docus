import { Module } from '@nuxt/types'
import { logger } from '../core/util'
import { useStorage } from '../core'
import { DocusSettings } from '../types/core'
import { get, fetch } from './github'

export default <Module>function docusGithubModule() {
  const { nuxt } = this
  const { hook, options } = nuxt

  options.privateRuntimeConfig = options.privateRuntimeConfig || {}
  options.privateRuntimeConfig.githubToken = process.env.GITHUB_TOKEN

  // Inject `docus` into ssrContext (for releases)
  // TODO: this could be removed when using $fetch with @nuxt/nitro to handle baseUrl with nuxt generate (using universal fetch)
  hook('vue-renderer:context', (ssrContext: any) => {
    ssrContext.docus = {
      releases: get()
    }
  })

  hook('docus:content:ready', async (settings: DocusSettings) => {
    try {
      const releases = await fetch(settings.github)
      const storage = useStorage()
      storage.setItem('/_docus/repo/github', {
        path: '/_docus/repo/github',
        releases
      })
    } catch (err) {
      logger.error(`Cannot fetch releases from Github, ${err}`)
    }
  })
}
