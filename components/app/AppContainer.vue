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
  <component :is="as" class="container">
    <slot />
  </component>
</template>

<style lang="ts" scoped>
css({
  '.container': {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%'
  },
  variants: {
    padded: {
      true: {
        px: '{space.4}',
        '@sm': {
          px: '{space.6}',
        }
      },
      options: {
        default: true
      }
    },
    fluid: {
      true: {
        overflowX: 'hidden',
      },
      false: {
        maxWidth: '80rem'
      },
      options: {
        default: false
      }
    }
  }
})
</style>
