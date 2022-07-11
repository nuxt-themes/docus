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
  <span :class="[type]" class="badge inline-flex items-center rounded-full px-3 py-1 text-base leading-5 tracking-tight">
    <Markdown :use="$slots.default" unwrap="p" />
  </span>
</template>
