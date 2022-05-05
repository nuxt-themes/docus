import { queryPage } from '../utils/queries'
import { defineNuxtRouteMiddleware, useNuxtApp } from '#imports'

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.client && to.path !== from.path) {
    useNuxtApp().callHook('docus:page:start')
  }
  await queryPage(to)
})
