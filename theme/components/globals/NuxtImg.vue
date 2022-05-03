<script setup lang="ts">
import type { PropType } from 'vue'

import { computed, useColorMode } from '#imports'

export interface NuxtImg {
  light: string
  dark: string
}

const props = defineProps({
  src: {
    type: [String, Object] as PropType<NuxtImg>,
    default: null,
  },
})

const colorMode = useColorMode()

const src = computed(() => {
  let src = props.src

  try {
    src = JSON.parse(src as any)
  } catch (e) {
    src = props.src
  }

  if (typeof src === 'string') return props.src

  if (colorMode.value === 'dark') return props.src.dark || props.src.light

  if (colorMode.value === 'light') return props.src.light || props.src.light
})
</script>

<template>
  <img :src="src" />
</template>
