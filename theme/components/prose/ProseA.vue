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
:not(h1, h2, h3, h4) > a {
  @apply font-medium no-underline text-primary-500 border-b border-transparent hover:border-primary-500 transition-colors;
}

h1 a,
h2 a,
h3 a,
h4 a {
  @apply relative;
  &::after {
    @apply absolute pl-2 w-6 h-6 opacity-0;
    content: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="%23111827"%3E%3Cpath stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /%3E%3C/svg%3E');
  }
  &:hover {
    &::after {
      @apply opacity-100;
    }
  }

  /* Hover underline */
  &:before {
    @apply absolute top-0 left-0 w-full;
    content: '';
    height: calc(100% + 4px);
  }
  &:hover:before {
    @apply border-b border-dashed border-gray-900 dark:border-gray-100;
  }
}

.dark h1 a,
.dark h2 a,
.dark h3 a,
.dark h4 a {
  &::after {
    content: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white"%3E%3Cpath stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /%3E%3C/svg%3E');
  }
}
</style>
