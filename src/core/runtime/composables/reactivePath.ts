import { ref } from '@nuxtjs/composition-api'
import { NuxtAppOptions } from '@nuxt/types'
import { Route } from 'vue-router'

/**
 * Reactive Vue Router path bound to Nuxt app instance.
 */
export const useReactivePath = (app: NuxtAppOptions, route: Route) => {
  const path = ref('/' + route.params.pathMatch)

  app.router.beforeEach((to: Route, _: any, next: () => void) => {
    path.value = '/' + to.params.pathMatch
    next()
  })

  return { path }
}
