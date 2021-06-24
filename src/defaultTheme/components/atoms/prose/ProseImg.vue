<template>
  <NuxtImg :src="src" :alt="alt" :width="width" :height="height" />
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number],
      default: undefined
    },
    height: {
      type: [String, Number],
      default: undefined
    }
  }
}
</script>

<style lang="postcss" scoped>
>>> img {
  @apply my-[1em];
}
</style>
