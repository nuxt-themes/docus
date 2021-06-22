<template>
  <Component :is="tag" class="relative w-full px-6 sm:px-8 lg:px-16 mx-auto max-w-8xl">
    <slot />
  </Component>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  }
})
</script>
