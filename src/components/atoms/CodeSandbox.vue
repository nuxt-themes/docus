<template>
  <div
    ref="box"
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

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    /**
     * Url to CodeSandbox embed
     */
    src: {
      type: String,
      required: true
    }
  },
  setup() {
    const box = ref()
    const observer = ref(null)
    const isIntersecting = ref(false)

    onMounted(() => {
      if (!window.IntersectionObserver) {
        isIntersecting.value = true
        return
      }

      observer.value = new window.IntersectionObserver(entries => {
        entries.forEach(({ intersectionRatio }) => {
          if (intersectionRatio > 0) {
            isIntersecting.value = true
            observer.value.disconnect()
            observer.value = null
          }
        })
      })

      observer.value.observe(box.value)
    })

    onBeforeUnmount(() => {
      if (observer.value) observer.value.disconnect()
    })

    return {
      isIntersecting,
      box
    }
  }
})
</script>

<style lang="postcss" scoped>
.codesandbox,
.codesandbox iframe {
  @apply w-full rounded-md overflow-hidden h-64;
  height: 650px;
}
</style>
