<script setup lang="ts">
defineProps({
  ...variants
})
</script>

<template>
  <div class="container">
    <slot />
  </div>
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
