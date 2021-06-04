<template>
  <ALabel
    tag="p"
    class="font-normal leading-relaxed"
    :class="{
      'text-sm 2xl:text-md': size === 'sm',
      'text-md lg:text-lg 2xl:text-lg': size === 'md',
      'text-lg 2xl:text-xl': size === 'lg'
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
      default: 'p'
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
