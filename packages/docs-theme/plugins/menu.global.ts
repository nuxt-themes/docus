import { defineNuxtPlugin, ref, watch } from '#imports'

export default defineNuxtPlugin((ctx: any) => {
  // Menu visible reference
  const visible = ref(false)

  // Current tab visible reference
  const currentTab = ref()

  // Scrollbar gap (used for responsive menu)
  const scrollBarGap = ref()

  // Open the menu
  const open = () => (visible.value = true)

  // Close the menu
  const close = () => (visible.value = false)

  // Toggle the menu (useful for one-off buttons)
  const toggle = () => (visible.value = !visible.value)

  // Toggle a tab from its id
  const toggleTab = (tab: string) => (currentTab.value === tab ? (currentTab.value = undefined) : (currentTab.value = tab))

  // Watch route change, close on change
  ctx.$router.afterEach(() => setTimeout(close, 50))

  // Watch visible and remove overflow so the scrollbar disappears when menu is opened
  if (process.client) {
    watch(
      visible,
      (isVisible) => {
        const html = document.documentElement

        // Init once, this value can be keeped
        if (!scrollBarGap.value) {
          scrollBarGap.value = window.innerWidth - html.clientWidth
          html.style.setProperty('--scrollbar-gap', `${scrollBarGap.value}px`)
        }

        if (isVisible) {
          html.style.overflow = 'hidden'
          html.style.paddingRight = `${scrollBarGap.value}px`
        } else {
          setTimeout(() => {
            html.style.overflow = ''
            html.style.paddingRight = ''
          }, 100) /* had to put it, because of layout shift on leave transition */
        }
      },
      {
        immediate: true,
      },
    )
  }

  return {
    provide: {
      menu: {
        scrollBarGap,
        visible,
        close,
        open,
        toggle,
        currentTab,
        toggleTab,
      },
    },
  }
})
