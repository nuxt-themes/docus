<template>
  <ALabel
    :tag="tag"
    class="font-normal font-serif"
    :class="{
      'sm:text-display-5 text-display-6 2xl:text-display-4': size === 'sm',
      'text-display-5 sm:text-display-4 md:text-display-3 2xl:text-display-2': size === 'md',
      'sm:text-display-2 text-display-3 2xl:text-display-1': size === 'lg'
    }"
  >
    <slot />
  </ALabel>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    tag: {
      type: String,
      default: 'h1'
    },
    size: {
      type: String,
      default: 'lg',
      validator(value) {
        return ['sm', 'md', 'lg'].includes(value)
      }
    }
  }
})
</script>
