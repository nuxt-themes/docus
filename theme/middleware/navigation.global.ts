import { useDocusState } from '../utils/state'
import { queryNavigation } from '../utils/queries'
import { defineNuxtRouteMiddleware } from '#imports'

export default defineNuxtRouteMiddleware(async () => {
  const { navigation } = useDocusState()

  if (process.server && !navigation.value) await queryNavigation()
})
