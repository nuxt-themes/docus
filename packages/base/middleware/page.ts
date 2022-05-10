import { queryPage } from '../utils'
import { defineNuxtRouteMiddleware, useNuxtApp } from '#imports'

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.client && to.path !== from.path) {
    // @ts-expect-error - Untyped hook
    useNuxtApp().callHook('docus:page:start')
  }

  const data = await queryPage(to)

  if (typeof data === 'string') return data
})
