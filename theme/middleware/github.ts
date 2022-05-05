import { useDocusState } from '../utils/state'
import { defineNuxtRouteMiddleware, githubReleases, useState } from '#imports'

export default defineNuxtRouteMiddleware(async (to) => {
  const { theme } = useDocusState()

  if (!theme.value?.github || !theme.value?.github?.repository) return

  const state = useState('docus-last-release')

  if (state.value) return

  await githubReleases().then(([release]) => (state.value = release))
})
