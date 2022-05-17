import { withQuery } from 'ufo'
import { defineNuxtRouteMiddleware, useDocusState, useState } from '#imports'

export default defineNuxtRouteMiddleware(async (to) => {
  const { theme } = useDocusState()

  const fetchRepository = async () => {
    const url = '/api/_github/repository'

    return $fetch(url)
  }

  const fetchLastRelease = async () => {
    const url = withQuery('/api/_github/releases', { last: true } as any)

    return $fetch(url)
  }

  /*
  if (!theme.value?.github || !theme.value?.github?.repository) return

  const lastReleaseState = useState('docus-last-release')

  const repositoryState = useState('docus-repository')

  if (lastReleaseState.value && repositoryState.value) return

  await Promise.all([fetchLastRelease(), fetchRepository()]).then(([lastRelease, repository]) => {
    lastReleaseState.value = lastRelease
    repositoryState.value = repository
  })
  */
})
