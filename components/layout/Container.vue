<script setup lang="ts">
import type { PropType } from 'vue'

type HTMLElementsTags = keyof HTMLElementTagNameMap

defineProps({
  as: {
    type: String as PropType<HTMLElementsTags>,
    required: false,
    default: 'div'
  },
  padded: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <component
    :is="as"
    class="container mx-auto w-full h-[inherit] max-w-[80rem]"
    :class="[padded ? 'px-4 sm:px-6 xl:px-8' : 'px-0']"
  >
    <slot />
  </component>
</template>
