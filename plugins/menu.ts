import { defineNuxtPlugin } from "nuxt/app"
import { ref, watch } from "vue"

export default defineNuxtPlugin((ctx: any) => {
  // Menu visible reference
  const visible = ref(false)

  // Open the menu
  const open = () => (visible.value = true)

  // Close the menu
  const close = () => (visible.value = false)

  // Toggle the menu (useful for one-off buttons)
  const toggle = () => (visible.value = !visible.value)

  // Watch route change, close on change
  ctx.$router.afterEach(() => setTimeout(close, 50))

  // Watch visible and remove overflow so the scrollbar disappears when menu is opened
  if (process.client) {
    watch(
      visible,
      (isVisible) => {
        const html = document.documentElement

        if (isVisible) {
          html.style.overflow = 'hidden'
        } else {
          setTimeout(() => {
            html.style.overflow = ''
          }, 100) /* had to put it, because of layout shift on leave transition */
        }
      },
      {
        immediate: true
      }
    )
  }

  return {
    provide: {
      menu: {
        visible,
        close,
        open,
        toggle
      }
    }
  }
})
