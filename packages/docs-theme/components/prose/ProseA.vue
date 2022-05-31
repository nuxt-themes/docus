<script setup lang="ts">
defineProps({
  href: {
    type: String,
    default: '',
  },
  blank: {
    type: Boolean,
    default: false,
  },
  /**
   * `true` if `href` points to a static file
   */
  static: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <NuxtLink :to="href" :blank="blank" :static="static">
    <slot />
  </NuxtLink>
</template>

<style lang="postcss" scoped>
:not(h1, h2, h3, h4) > a:not(:has(code)) {
  @apply text-primary-500 hover:border-primary-500 border-b-2 border-transparent font-medium no-underline hover:border-b-2;
}
</style>
