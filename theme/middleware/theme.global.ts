import { queryTheme } from '../utils/queries'
import { defineNuxtRouteMiddleware } from '#imports'

export default defineNuxtRouteMiddleware(async () => {
  await queryTheme()
})
