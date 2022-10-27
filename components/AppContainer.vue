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
        padding: '1rem',
        '@mq.sm': {
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
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
