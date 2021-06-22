<template>
  <Component :is="tag">
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
