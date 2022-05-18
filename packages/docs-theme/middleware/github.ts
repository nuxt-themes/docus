import { defineNuxtRouteMiddleware, useDocusState, useGithub, useState } from '#imports'

export default defineNuxtRouteMiddleware(async () => {
  const { theme } = useDocusState()

  if (!theme.value?.github) return

  const { fetchRepository, fetchLastRelease } = useGithub()

  const lastReleaseState = useState('docus-last-release')

  const repositoryState = useState('docus-repository')

  if (lastReleaseState.value && repositoryState.value) return

  await Promise.all([fetchLastRelease(), fetchRepository()]).then(([lastRelease, repository]) => {
    lastReleaseState.value = lastRelease
    repositoryState.value = repository
  })
})
