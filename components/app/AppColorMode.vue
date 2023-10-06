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
    class="app-color-mode flex p-4 text-secondary-static text-secondary-hover"
    aria-label="Color Mode"
    @click="onClick"
  >
    <ColorScheme placeholder="...">
      <Icon
        v-if="colorMode.preference === 'dark'"
        name="ph:moon-fill"
      />
      <Icon
        v-else-if="colorMode.preference === 'light'"
        name="ph:sun-dim-fill"
      />
      <Icon
        v-else
        name="ph:desktop-fill"
      />
    </ColorScheme>
  </button>
</template>
