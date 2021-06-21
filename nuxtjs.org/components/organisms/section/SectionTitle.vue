<template>
  <Component :is="tag" class="font-normal font-serif text-display-6 md:text-display-5 2xl:text-display-4">
    <slot />
  </Component>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    tag: {
      type: String,
      default: 'h2'
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
