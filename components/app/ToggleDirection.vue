<script setup lang="ts">
const direction = useTextDirection()
const onClick = () => {
  direction.value = direction.value === 'ltr' ? 'rtl' : 'ltr'
}
</script>

<template>
  <ClientOnly>
    <button aria-label="Text direction" @click="onClick">
      <Icon v-if="direction === 'ltr'" name="fluent:text-direction-horizontal-right-24-regular" />
      <Icon v-if="direction === 'rtl'" name="fluent:text-direction-horizontal-left-24-regular" />
    </button>
  </ClientOnly>
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
