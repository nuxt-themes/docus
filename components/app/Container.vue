<script setup lang="ts">
const props = defineProps({
  padded: {
    type: Boolean,
    default: false,
  },
  constrained: {
    type: Boolean,
    default: true,
  },
})

const containerClass = computed(() => classNames(
  'mx-auto max-w-7xl px-4 sm:px-6',
  props.padded && 'px-4',
))
</script>

<template>
  <div :class="containerClass">
    <slot />
  </div>
</template>
