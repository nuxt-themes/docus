<script setup lang="ts">
import { classNames } from '../../utils'

const props = defineProps({
  padded: {
    type: Boolean,
    default: true,
  },
  fluid: {
    type: Boolean,
    default: false,
  },
  constrainedClass: {
    type: String,
    default: 'max-w-7xl',
  },
})

const containerClass = computed(() => {
  return classNames('mx-auto w-full sm:px-6 lg:px-8', props.padded && 'px-4', !props.fluid && props.constrainedClass, props.fluid && 'overflow-x-hidden')
})
</script>

<template>
  <div :class="containerClass">
    <slot />
  </div>
</template>
