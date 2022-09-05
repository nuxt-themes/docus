<script setup lang="ts">
const props = defineProps({
  padded: {
    type: Boolean,
    default: true
  },
  fluid: {
    type: Boolean,
    default: false
  },
  constrainedClass: {
    type: String,
    default: 'max-w-7xl'
  }
})

const containerClass = computed(() => {
  return [
    'mx-auto w-full',
    props.padded && 'px-4 sm:px-6 lg:px-8',
    !props.fluid && props.constrainedClass,
    props.fluid && 'overflow-x-hidden'
  ].filter(Boolean).join(' ')
})
</script>

<template>
  <div :class="containerClass">
    <slot />
  </div>
</template>
