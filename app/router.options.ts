import type { RouterConfig } from '@nuxt/schema'
// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig> {

  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      const { marginTop } = getComputedStyle((document.querySelector(to.hash) as any))
      const marginTopValue = parseInt(marginTop)
      const offset = (document.querySelector(to.hash) as any).offsetTop - marginTopValue
      return {
        top: offset,
        behavior: 'smooth'
      }
    }
  }
}
