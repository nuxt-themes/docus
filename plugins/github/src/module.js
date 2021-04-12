import { get, handler } from './lib'

export default function docusGithubModule() {
  const { nuxt, addServerMiddleware } = this
  const { hook } = nuxt
  // Inject `docus` into ssrContext (for releases)
  // TODO: this could be removed when using $fetch with @nuxt/nitro to handle baseUrl with nuxt generate (using universal fetch)
  hook('vue-renderer:context', ssrContext => {
    ssrContext.docus = {
      releases: get()
    }
  })

  /**
   * TODO:
   * 1. docus core hook
   * 2. docus core parser helpers
   */
  //   hook('docus:setting:ready', settings => {
  //     fetch({ $content, settings })
  //   })

  addServerMiddleware({
    path: '/api/docus/releases',
    handler
  })
}
