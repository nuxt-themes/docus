<script setup lang="ts">
defineProps({
  padded: {
    type: Boolean,
    required: false,
    default: false,
  },
})
</script>

<template>
  <div :class="[padded ? 'px-4 sm:px-6' : '']" class="lg:max-w-8xl mx-auto max-w-full">
    <slot />
  </div>
</template>
