<script setup lang="ts">
const colorMode = useColorMode()

type ColorMode = 'light' | 'dark'

const mode = computed<ColorMode>({
  get() {
    return colorMode.value as ColorMode
  },
  set(v: ColorMode) {
    colorMode.preference = v
  },
})

const onClick = () => {
  mode.value === 'light' ? (mode.value = 'dark') : (mode.value = 'light')
}
</script>

<template>
  <button
    class="icon-base w-6 h-6"
    aria-label="Color Mode"
    @click="onClick"
  >
    <ClientOnly>
      <IconSun v-if="mode === 'dark'" />
      <IconMoon v-else />

      <template #placeholder>
        ...
      </template>
    </ClientOnly>
  </button>
</template>
