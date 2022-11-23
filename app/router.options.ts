import type { RouterConfig } from '@nuxt/schema'
// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig> {
  scrollBehavior (to) {
    if (to.hash) {
      const el = document.querySelector(to.hash) as any

      if (!el) { return }

      const { marginTop } = getComputedStyle(el)

      const marginTopValue = parseInt(marginTop)

      const offset = (document.querySelector(to.hash) as any).offsetTop - marginTopValue

      return {
        top: offset,
        behavior: 'smooth'
      }
    }
  }
}
