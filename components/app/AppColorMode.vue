<script setup lang="ts">
const colorMode = useColorMode()
const onClick = () => {
  const values = ['system', 'light', 'dark']
  const index = values.indexOf(colorMode.preference)
  const next = (index + 1) % values.length
  colorMode.preference = values[next]
}
</script>

<template>
  <button
    aria-label="Color Mode"
    @click="onClick"
  >
    <ColorScheme placeholder="...">
      <Icon v-if="colorMode.preference === 'dark'" name="ph:moon-fill" />
      <Icon v-else-if="colorMode.preference === 'light'" name="ph:sun-dim-fill" />
      <Icon v-else name="ph:desktop-fill" />
    </ColorScheme>
  </button>
</template>

<style lang="ts" scoped>
css({
  button: {
    display: 'flex',
    padding: '{docus.app.colorMode.padding}',
    color: '{docus.app.colorMode.color.static}',
    '&:hover': {
      color: '{docus.app.colorMode.color.hover}'
    }
  }
})
</style>
