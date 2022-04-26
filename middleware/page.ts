import { pageQuery } from '../utils/queries'
// import { flattenComponents } from '../utils/components'
// import { useDocusState } from '../utils/state'
import { defineNuxtRouteMiddleware } from '#imports'

export default defineNuxtRouteMiddleware(
  async(to) => {
    await pageQuery(to)

    /*
      Wished this worked

      const { page } = useDocusState()

      // Components used in page (prose + Vue components)
      const components = flattenComponents(page.value.body.children)

      // Inject components into page chunk
      for (const component of components) resolveComponent(component)
    */
  },
)
