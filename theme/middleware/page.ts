import { queryPage } from '../utils/queries'
import { defineNuxtRouteMiddleware } from '#imports'

export default defineNuxtRouteMiddleware(async (to) => {
  await queryPage(to)
})
