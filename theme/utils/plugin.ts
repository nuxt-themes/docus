import { queryNavigation, queryPage, queryTheme } from './queries'
import { defineNuxtPlugin, useRoute } from '#imports'

/**
 * Plugin enabled only in development
 * Ensure hot reload works with content sources
 */
export default defineNuxtPlugin((nuxt) => {
  nuxt.hook('app:data:refresh', async () => {
    if (process.client) {
      const route = useRoute()

      await queryNavigation(true)
      await queryTheme(true)
      await queryPage(route, true)
    }
  })
})
