import { useDocusState } from '../utils/state'
import { queryTheme } from '../utils/queries'
import { defineNuxtRouteMiddleware } from '#imports'

export default defineNuxtRouteMiddleware(async () => {
  const { theme } = useDocusState()

  if (process.server && !theme.value) await queryTheme()
})
