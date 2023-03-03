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
          const top = window.scrollY || window.pageYOffset || html.scrollTop
          html.style.setProperty('--scroll-top', `${top}`)
          html.style.top = `-${top}px`
          html.style.position = 'fixed'
          html.style.width = '100%'
          html.style.overflowY = 'scroll'
        } else {
          const top = parseInt(html.style.getPropertyValue('--scroll-top'))
          html.style.top = ''
          html.style.position = ''
          html.style.width = ''
          html.style.overflowY = ''
          window.scrollTo(0, top)
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
