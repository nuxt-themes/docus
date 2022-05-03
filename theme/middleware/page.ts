import { queryPage } from '../utils/queries'
import { useDocusState } from '../utils/state'
import { defineNuxtRouteMiddleware } from '#imports'

export default defineNuxtRouteMiddleware(async (to) => {
  const { page } = useDocusState()

  if (page.value && page.value.slug === to.path) return

  await queryPage(to)
})
