export default defineNuxtPlugin(() => {
  if (navigator && navigator.userAgent && navigator.userAgent.match(/Win[a-z0-9]*;/)) {
    document.documentElement.classList.add('docus-scrollbars')
  }
})
