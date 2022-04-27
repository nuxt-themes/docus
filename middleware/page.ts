import { queryPage } from '../utils/queries'
import { flattenComponents } from '../utils/components'
import { useDocusState } from '../utils/state'
import { defineNuxtRouteMiddleware } from '#imports'
import * as Components from '#components'

export default defineNuxtRouteMiddleware(
  async(to) => {
    await queryPage(to)

    const { page } = useDocusState()
    const nuxtApp = useNuxtApp()

    console.log('page middleware', page.value)
    if (page.value) {
    // Components used in page (prose + Vue components)
      const components = flattenComponents(page.value.body.children)

      // Preload components before rendering
      for (const name of components) {
        if (!nuxtApp.vueApp.component(name)) {
          console.log('load component', name)
          nuxtApp.vueApp.component(name, Components[name])
        }
      }
    }
  },
)
