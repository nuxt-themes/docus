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
  <div class="alert mt-4 mb-4 rounded-xl px-4 py-3 text-sm leading-relaxed" :class="[type]">
    <div class="flex items-start">
      <div class="alert-content flex-grow">
        <ContentSlot :use="$slots.default" unwrap="p" />
      </div>
    </div>
  </div>
</template>
