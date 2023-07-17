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
  <header>
    <button
      aria-label="Color Mode"
      @click="onClick"
    >
    color mode
    </button>
  </header>
</template>