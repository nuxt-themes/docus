import { flattenComponents } from '../utils/components'
import { useDocusState } from '../utils/state'
import * as Components from '#components'
import { useNuxtApp } from '#imports'

export default defineNuxtRouteMiddleware(
  async () => {
    const { page } = useDocusState()
    const nuxtApp = useNuxtApp()

    if (page.value) {
      // Components used in page (prose + Vue components)
      const components: string[] = flattenComponents(page.value.body.children)

      // Preload components before rendering
      for (const name of components) {
        if (!nuxtApp.vueApp.component(name)) {
          // eslint-disable-next-line no-console
          console.log({ name, component: (Components as any)[name] })

          nuxtApp.vueApp.component(name, (Components as any)[name])
        }
      }
    }
  },
)
