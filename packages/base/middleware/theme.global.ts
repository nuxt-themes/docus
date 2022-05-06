import { queryTheme } from '../utils'
import { defineNuxtRouteMiddleware } from '#imports'

export default defineNuxtRouteMiddleware(async () => {
  await queryTheme()
})
