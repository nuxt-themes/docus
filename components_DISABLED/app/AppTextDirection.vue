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
    padding: '{docus.app.textDirection.padding}',
    color: '{elements.text.secondary.color.static}',
    '&:hover': {
      color: '{elements.text.secondary.color.hover}'
    }
  }
})
</style>
