<template>
  <Link :to="href" :blank="blank">
    <slot />
  </Link>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    href: {
      type: String,
      default: ''
    },
    blank: {
      type: Boolean,
      default: false
    },
    /**
     * `true` if `href` points to a static file
     */
    static: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="postcss" scoped>
:not(h1, h2, h3, h4) > a {
  @apply font-medium no-underline d-prose-a-text d-prose-a-border hover:d-prose-a-border-hover;
}

h1 a,
h2 a,
h3 a,
h4 a {
  @apply relative;
  &::after {
    @apply absolute pl-2 w-5 h-5 opacity-0;
    content: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="%23111827"%3E%3Cpath stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /%3E%3C/svg%3E');
  }
  &:hover {
    &::after {
      @apply opacity-100;
    }
  }
  /* hover underline */
  &:before {
    @apply absolute top-0 left-0 w-full;
    content: '';
    height: calc(100% + 4px);
  }
  &:hover:before {
    @apply d-prose-a-headline-border;
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
