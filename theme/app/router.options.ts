import type { RouterConfig } from '@nuxt/schema'

// https://router.vuejs.org/api/#routeroptions
export default <RouterConfig>{
  scrollBehavior: (to) => {
    if (to.params?.smooth) {
      return {
        el: to.params?.smooth,
        behavior: 'smooth',
      }
    }

    // Scroll to top of window
    window.scrollTo({
      top: 0,
    })
  },
}
