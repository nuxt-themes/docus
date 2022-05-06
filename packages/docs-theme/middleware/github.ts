import { defineNuxtRouteMiddleware, githubReleases, useDocusState, useState } from '#imports'

export default defineNuxtRouteMiddleware(async (to) => {
  const { theme } = useDocusState()

  if (!theme.value?.github || !theme.value?.github?.repository) return

  const state = useState('docus-last-release')

  if (state.value) return

  await githubReleases({ per_page: '1' }).then(([release]) => (state.value = release))
})
