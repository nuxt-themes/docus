import { useDocusState } from '../utils/state'
import { themeQuery } from '../utils/queries'
import { defineNuxtRouteMiddleware } from '#imports'

export default defineNuxtRouteMiddleware(
  async() => {
    const { theme } = useDocusState()

    if (!theme.value)
      await themeQuery()
  },
)
