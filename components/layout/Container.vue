<script setup lang="ts">
import type { PropType } from 'vue'
import appConfig from '#build/app.config'

const { tokens } = appConfig

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
    class="container mx-auto w-full"
    :class="[padded ? tokens.container.padding : 'px-0', tokens.container.maxWidth]"
  >
    <slot />
  </component>
</template>
