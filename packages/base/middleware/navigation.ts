import { queryNavigation } from '../utils'
import { defineNuxtRouteMiddleware } from '#imports'

export default defineNuxtRouteMiddleware(async () => {
  await queryNavigation()
})
