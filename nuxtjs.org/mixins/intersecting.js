export default {
  data() {
    return {
      isIntersecting: false
    }
  },
  mounted() {
    if (!window.IntersectionObserver) {
      return console.warn('IntersectionObserver polyfill is required.') // eslint-disable-line no-console
    }

    this.__observer = new window.IntersectionObserver(entries => {
      entries.forEach(({ intersectionRatio, target: el }) => {
        if (intersectionRatio > 0) {
          this.isIntersecting = true
          this.__observer.disconnect()
        }
      })
    })
    this.__observer.observe(this.$el)
  },
  beforeDestroy() {
    if (this.__observer) {
      this.__observer.disconnect()
      delete this.__observer
    }
  }
}
