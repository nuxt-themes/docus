import type { RouterConfig } from '@nuxt/schema'
// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig> {
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      const target = document.querySelector(to.hash) as HTMLElement
      const { marginTop } = getComputedStyle(target)
      const marginTopValue = parseInt(marginTop)
      const offset = target.offsetTop - marginTopValue
      return {
        top: offset,
        behavior: 'smooth'
      }
    }
    return savedPosition || { left: 0, top: 0 }
  }
}
