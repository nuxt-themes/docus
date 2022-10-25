<script setup lang="ts">
defineProps({
  size: {
    type: String,
    default: 'w-5 h-5'
  }
})

const colorMode = useColorMode()
const onClick = () => {
  const values = ['system', 'light', 'dark']
  const index = values.indexOf(colorMode.preference)
  const next = (index + 1) % values.length

  colorMode.preference = values[next]
}
</script>

<template>
  <button aria-label="Color Mode" class="inline-block u-text-gray-500 hover:u-text-gray-700" @click="onClick">
    <ColorScheme placeholder="...">
      <Icon v-if="colorMode.preference === 'dark'" :class="size" name="uil:moon" />
      <Icon v-else-if="colorMode.preference === 'light'" :class="size" name="uil:sun" />
      <Icon v-else :class="size" name="uil:desktop" />
    </ColorScheme>
  </button>
</template>
