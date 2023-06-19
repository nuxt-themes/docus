<script setup lang="ts">
import type { PropType } from 'vue'

type HTMLElementsTags = keyof HTMLElementTagNameMap

defineProps({
  as: {
    type: String as PropType<HTMLElementsTags>,
    required: false,
    default: 'div'
  },
  ...variants
})
</script>

<template>
  <component
    :is="as"
    class="container"
  >
    <slot />
  </component>
</template>

<style lang="ts" scoped>
css({
  '.container': {
    marginInlineStart: 'auto',
    marginInlineEnd: 'auto',
    width: '100%',
    height: 'inherit',
    maxWidth: '{docus.layout.container.maxWidth}'
  },
  variants: {
    padded: {
      true: {
        px: '{docus.layout.container.padding}',
      },
      options: {
        default: true
      }
    }
  }
})
</style>
