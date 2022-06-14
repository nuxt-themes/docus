import { addRouteMiddleware, defineNuxtPlugin, useRuntimeConfig, useState } from '#imports'

export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig()

  // Setup GitHub global integration
  if (config?.github) {
    addRouteMiddleware(
      'github',
      async () => {
        // Github integration state
        const lastReleaseState = useState('docus-last-release')
        const repositoryState = useState('docus-repository')

        // Check if data is already present
        if (typeof lastReleaseState.value !== 'undefined' && typeof repositoryState.value !== 'undefined') return

        try {
          await Promise.all([$fetch('/api/_github/last-release', { responseType: 'json' }), $fetch('/api/_github/repository', { responseType: 'json' })]).then(
            ([lastRelease, repository]) => {
              lastReleaseState.value = lastRelease
              repositoryState.value = repository
            },
          )
        } catch (e) {
          lastReleaseState.value = false
          repositoryState.value = false

          console.warn(`Cannot fetch GitHub global data.`)

          // eslint-disable-next-line no-console
          console.info('If your repository is private, make sure to provide GITHUB_TOKEN environment in `.env`')
        }
      },
      { global: true },
    )
  }
})
