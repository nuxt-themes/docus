export default defineNuxtPlugin((ctx: any) => {
  // Body locked reference
  const locked = ref(false)

  // lock the body
  const lock = () => (locked.value = true)

  // unlock the body
  const unlock = () => (locked.value = false)

  // Toggle locking (useful for one-off buttons)
  const toggle = () => (locked.value = !locked.value)

  // Watch route change, unlock on change
  ctx.$router.afterEach(() => {
    if (locked.value) {
      setTimeout(unlock, 50)
    }
  })

  // Watch locked and remove overflow so the scrollbar disappears when body is locked
  if (process.client) {
    watch(
      locked,
      (isLocked) => {
        const html = document.documentElement

        if (isLocked) {
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
      bodyLock: {
        locked,
        unlock,
        lock,
        toggle
      }
    }
  }
})
