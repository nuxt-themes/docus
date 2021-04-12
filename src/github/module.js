import { get, handler, fetch } from './lib'

export default function docusGithubModule() {
  const { nuxt, addServerMiddleware } = this
  const { hook, options } = nuxt

  options.privateRuntimeConfig = options.privateRuntimeConfig || {}
  options.privateRuntimeConfig.githubToken = process.env.GITHUB_TOKEN

  // Inject `docus` into ssrContext (for releases)
  // TODO: this could be removed when using $fetch with @nuxt/nitro to handle baseUrl with nuxt generate (using universal fetch)
  hook('vue-renderer:context', ssrContext => {
    ssrContext.docus = {
      releases: get()
    }
  })

  hook('docus:content:ready', ({ $content, settings }) => {
    fetch({ $content, settings })
  })

  addServerMiddleware({
    path: '/api/docus/releases',
    handler
  })
}
