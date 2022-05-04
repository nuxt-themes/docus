import { queryPage } from '../utils/queries'
import { useDocusState } from '../utils/state'
import { defineNuxtRouteMiddleware } from '#imports'

export default defineNuxtRouteMiddleware(async (to) => {
  await queryPage(to)
})
