<script setup lang="ts">
defineProps({
  /**
   * @values info, success, warning, danger
   */
  type: {
    type: String,
    default: 'info',
    validator(value: string) {
      return ['info', 'success', 'warning', 'danger', 'primary'].includes(value)
    },
  },
})
</script>

<template>
  <div class="px-4 py-3 mt-4 mb-4 text-sm leading-relaxed alert rounded-xl" :class="[type]">
    <div class="flex items-start">
      <div class="flex-grow alert-content">
        <Markdown :use="$slots.default" unwrap="p" />
      </div>
    </div>
  </div>
</template>
