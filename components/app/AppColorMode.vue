<script setup lang="ts">
import appConfig from '#build/app.config'

const { tokens } = appConfig

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
    class="app-color-mode flex"
    :class="Object.values(tokens.appColorMode)"
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

</style>
