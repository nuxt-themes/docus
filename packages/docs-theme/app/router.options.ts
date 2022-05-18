import type { RouterConfig } from '@nuxt/schema'
import { useConvertPropToPixels } from '../composables/useScrollToHeading'

// https://router.vuejs.org/api/#routeroptions
export default <RouterConfig>{
  scrollBehavior: (to, _, savedPosition) => {
    // Scroll to heading on click
    if (to.hash) {
      setTimeout(() => {
        const heading = document.querySelector(to.hash) as any

        const offset = heading.offsetTop - useConvertPropToPixels('--header-height')

        window.scrollTo({
          top: offset,
          behavior: 'smooth',
        })
      })

      return
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
