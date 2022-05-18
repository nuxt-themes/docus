<script setup lang="ts">
defineProps({
  /**
   * @values info, success, warning, danger
   */
  type: {
    type: String,
    default: 'info',
    validator(value: string) {
      return ['info', 'success', 'warning', 'danger', 'primary', 'gray'].includes(value)
    },
  },
})
</script>

<template>
  <span :class="[type]" class="inline-flex items-center px-3 py-1 text-base leading-5 tracking-tight rounded-full badge">
    <slot />
  </span>
</template>
