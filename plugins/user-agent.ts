export default defineNuxtPlugin(() => {
  const isMobile = ref(false)
  const isSafari = ref(false)
  const isFirefox = ref(false)
  const isChrome = ref(false)
  const isEdge = ref(false)

  const refresh = () => {
    const ua = navigator.userAgent

    isMobile.value = /iPhone|iPad|iPod|Android/i.test(ua)
    isFirefox.value = /Firefox/i.test(ua)
    isChrome.value = /Chrome/i.test(ua) && !/Edg/i.test(ua)
    isSafari.value = /Safari/i.test(ua) && !/Chrome/i.test(ua)
    isEdge.value = /Edg/i.test(ua)
  }

  if (process.client) { refresh() }

  return {
    provide: {
      userAgent: {
        isMobile,
        isSafari,
        isFirefox,
        isChrome,
        isEdge
      }
    }
  }
})
