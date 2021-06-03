<template>
  <div
    class="codesandbox w-full mb-6 mx-auto bg-black text-white text-3xl text-center flex items-center justify-center overflow-hidden rounded"
  >
    <iframe
      v-if="isIntersecting && src"
      :src="src"
      title="CodeSandbox editor"
      sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
      class="w-full h-full overflow-hidden"
    />
    <span v-else>Loading Nuxt Sandbox...</span>
  </div>
</template>

<script>
import intersectingMixin from '~/mixins/intersecting.js'
export default {
  mixins: [intersectingMixin],
  props: {
    src: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.codesandbox,
.codesandbox iframe {
  height: 700px;
  max-width: 1400px;
}
</style>
