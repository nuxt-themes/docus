<script setup lang="ts">
import type { PropType } from 'vue'

import { computed } from '#imports'

const props = defineProps({
  src: {
    type: [String, Object] as PropType<NuxtImg>,
    default: null,
  },
  imageClasses: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: '',
  },
  width: {
    type: [String, Number],
    default: undefined,
  },
  height: {
    type: [String, Number],
    default: undefined,
  },
})

type NuxtImg = string & {
  light: string
  dark: string
}

const src = computed(() => {
  let src = props.src

  try {
    src = JSON.parse(src as any)
  } catch (e) {
    src = props.src
  }

  if (typeof src === 'string') return props.src

  return src
})
</script>

<template>
  <img v-if="typeof src === 'string'" :src="src" :alt="alt" :width="width" :height="height" />
  <img v-if="src?.light" class="dark-img" :src="src.light" :alt="alt" :width="width" :height="height" />
  <img v-if="src?.dark" class="light-img" :src="src.dark" :alt="alt" :width="width" :height="height" />
</template>
