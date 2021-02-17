import Vue from 'vue'

export default ({ app }, inject) => {
  const $menu = Vue.observable({
    open: false
  })
  if (process.client) {
    // For mobile navigation when clicking on a menu link
    app.router.afterEach(() => {
      if ($menu.open) {
        setTimeout(() => {
          $menu.open = false
        }, 50)
      }
    })
  }
  inject('menu', $menu)
}
