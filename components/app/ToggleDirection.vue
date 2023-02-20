<script setup lang="ts">
const direction = useTextDirection()
const onClick = () => {
  direction.value = direction.value === 'ltr' ? 'rtl' : 'ltr'
}
</script>

<template>
  <button aria-label="Text direction" @click="onClick">
    <Icon name="uil:arrows-merge" />
  </button>
</template>

<style lang="ts" scoped>
css({
  button: {
    display: 'flex',
    padding: '{space.4}',

    color: '{color.gray.500}',
    '@dark': {
      color: '{color.gray.400}'
    },

    '&:hover': {
      color: '{color.gray.700}',
      '@dark': {
        color: '{color.gray.200}',
      }
    },
  }
})
</style>
