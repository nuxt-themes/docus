<script setup lang="ts">
defineProps({
  width: {
    type: String,
    default: '600px',
  },
  height: {
    type: String,
    default: '160px',
  },
})
</script>

<template>
  <div class="absolute left-0 top-0 w-full max-w-full">
    <div class="ellipsis" />
  </div>
</template>


<style lang="postcss" scoped>
.ellipsis {
  @apply h-[160px] md:w-[600px];
  background: linear-gradient(97.62deg, rgba(0, 71, 225, 0.22) 2.27%, rgba(26, 214, 255, 0.22) 50.88%, rgba(0, 220, 130, 0.22) 98.48%);
  filter: blur(169px);
}
</style>
