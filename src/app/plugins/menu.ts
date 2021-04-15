import { defineNuxtPlugin, Ref, ref, watch } from '@nuxtjs/composition-api'

export default defineNuxtPlugin((ctx, inject) => {
  // Menu visible reference
  const visible = ref(false)

  // Current tab visible referece
  const currentTab = ref()

  // Open the menu
  const open = () => (visible.value = true)

  // Close the menu
  const close = () => (visible.value = false)

  // Toggle the menu (useful for one-off buttons)
  const toggle = () => (visible.value = !visible.value)

  // Toggle a tab from its id
  const toggleTab = (tab: string) =>
    currentTab.value === tab ? (currentTab.value = undefined) : (currentTab.value = tab)

  // Watch route change, close on change
  ctx.app.router?.afterEach(() => {
    setTimeout(close, 50)
  })

  // Watch visible and remove overflow so the scrollbar disappears when menu is opened
  watch(
    visible,
    isVisible => {
      if (isVisible) {
        const scrollBarGap = window.innerWidth - document.documentElement.clientWidth
        document.body.style.overflow = 'hidden'
        document.body.style.paddingRight = `${scrollBarGap}px`
      } else {
        setTimeout(() => {
          document.body.style.overflow = null
          document.body.style.paddingRight = null
        }, 16)
      }
    },
    {
      immediate: true
    }
  )

  // Inject menu
  inject('menu', {
    visible,
    close,
    open,
    toggle,
    currentTab,
    toggleTab
  })
})

declare module 'vue/types/vue' {
  interface Vue {
    $menu: {
      visible: Ref<boolean>
      currentTab: Ref<string>
      close: () => void
      open: () => void
      toggle: () => void
      toggleTab: (tab: string) => void
    }
  }
}
