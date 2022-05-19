<script setup lang="ts">
import { loadIcon } from '@iconify/vue'
import { computed, useColorMode } from '#imports'

defineProps({
  size: {
    type: String,
    default: 'w-8 h-8',
  },
  spacing: {
    type: String,
    default: 'p-0',
  },
})

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

const onClick = () => (mode.value === 'light' ? (mode.value = 'dark') : (mode.value = 'light'))
</script>

<template>
  <button :class="[size, spacing]" class="block icon-base" aria-label="Color Mode" @click="onClick">
    <ClientOnly>
      <Icon v-if="mode === 'dark'" name="heroicons-outline:sun" :class="[spacing, size]" />
      <Icon v-else name="heroicons-outline:moon" :class="[spacing, size]" />

      <template #placeholder>
        <span class="block" :class="[size, spacing]"> ... </span>
      </template>
    </ClientOnly>
  </button>
</template>
