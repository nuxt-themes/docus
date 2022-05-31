import type { RouterConfig } from '@nuxt/schema'

// https://router.vuejs.org/api/#routeroptions
export default <RouterConfig>{
  scrollBehavior: (to, _, savedPosition) => {
    // Scroll to heading on click
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }

    if (to.params?.smooth) {
      return {
        el: to.params?.smooth,
        behavior: 'smooth',
      }
    }

    // Scroll to top of window
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
}
