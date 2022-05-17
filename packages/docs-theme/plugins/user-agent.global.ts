import { defineNuxtPlugin, ref } from '#imports'

export default defineNuxtPlugin(() => {
  const isDesktopSafari = ref(false)
  const isDesktopFirefox = ref(false)

  const refresh = () => {
    isDesktopSafari.value = !/Mobi|Android/i.test(navigator.userAgent) && /Safari/i.test(navigator.userAgent) && !/Chrome|Chromium/i.test(navigator.userAgent)

    isDesktopFirefox.value = !/Mobi|Android/i.test(navigator.userAgent) && /Firefox/i.test(navigator.userAgent)
  }

  if (process.client) refresh()

  return {
    provide: {
      userAgent: {
        isDesktopSafari,
        isDesktopFirefox,
      },
    },
  }
})
