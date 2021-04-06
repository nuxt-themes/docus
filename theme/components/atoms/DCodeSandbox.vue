<template>
  <div
    class="flex items-center justify-center w-full min-h-[500px] mx-auto mb-6 overflow-hidden text-3xl text-center text-white bg-black rounded-md codesandbox"
    style="background-color: rgb(21, 21, 21)"
  >
    <iframe
      v-if="isIntersecting && src"
      :src="src"
      title="CodeSandbox editor"
      sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
      class="w-full h-full min-h-[500px] overflow-hidden"
    />
    <span v-else>Loading CodeSandbox...</span>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * Url to CodeSandbox embed
     */
    src: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isIntersecting: false
    }
  },
  mounted() {
    if (!window.IntersectionObserver) {
      this.isIntersecting = true
      return
    }

    this.__observer = new window.IntersectionObserver(entries => {
      entries.forEach(({ intersectionRatio, target: el }) => {
        if (intersectionRatio > 0) {
          this.isIntersecting = true
          this.__observer.disconnect()
          delete this.__observer
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
</script>

<style lang="postcss" scoped>
.codesandbox,
.codesandbox iframe {
  @apply w-full rounded-md overflow-hidden h-64;
  height: 650px;
}
</style>
