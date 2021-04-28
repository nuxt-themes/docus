<template>
  <video :poster="poster">
    <source v-for="source in sources" :key="source.src || source" :src="source.src || source" :type="source.type" />
  </video>
</template>

<script>
export default {
  props: {
    poster: {
      type: String,
      default: ''
    },
    sources: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped lang="postcss">
video {
  @apply w-full py-4;
}
</style>
