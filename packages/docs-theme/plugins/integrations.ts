import { withQuery } from 'ufo'
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

        if (lastReleaseState.value && repositoryState.value) return

        // TODO: Dynamically import `useGithub`
        const fetchRepository = async () => {
          const url = '/api/_github/repository'

          return $fetch(url, { responseType: 'json' })
        }
        const fetchLastRelease = async () => {
          const url = withQuery('/api/_github/releases', { last: true } as any)

          return $fetch(url, { responseType: 'json' })
        }
        await Promise.all([fetchLastRelease(), fetchRepository()]).then(([lastRelease, repository]) => {
          lastReleaseState.value = lastRelease
          repositoryState.value = repository
        })
      },
      { global: true },
    )
  }
})
