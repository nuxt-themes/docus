<template>
  <Component
    :is="tag"
    class="font-normal font-serif text-display-5 sm:text-display-4 md:text-display-3 2xl:text-display-2"
  >
    <slot />
  </Component>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    tag: {
      type: String,
      default: 'h1'
    }
  }
})
</script>
