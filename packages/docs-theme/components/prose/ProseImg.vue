<script setup lang="ts">
defineProps({
  src: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: '',
  },
  width: {
    type: [String, Number],
    default: undefined,
  },
  height: {
    type: [String, Number],
    default: undefined,
  },
})
</script>

<template>
  <NuxtImg v-bind="$attrs" :src="src" :alt="alt" :width="width" :height="height" />
</template>

<style lang="postcss" scoped>
:deep(img) {
  @apply my-[1em];
}
</style>
