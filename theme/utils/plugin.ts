import { queryNavigation, queryPage, queryTheme } from './queries'
import { useRoute } from '#imports'

/**
 * Plugin enabled only in development
 * Ensure hot reload works with content sources
 */
export default defineNuxtPlugin(
  (nuxt) => {
    nuxt.hook(
      'app:data:refresh',
      async () => {
        const route = useRoute()

        await queryNavigation()
        await queryTheme()
        await queryPage(route)
      },
    )
  },
)
