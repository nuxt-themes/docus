import { useDocusState } from '../utils/state'
import { navigationQuery } from '../utils/queries'
import { defineNuxtRouteMiddleware } from '#imports'

export default defineNuxtRouteMiddleware(
  async() => {
    const { navigation } = useDocusState()

    if (!navigation.value)
      await navigationQuery()
  },
)
