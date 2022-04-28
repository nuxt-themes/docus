<script setup lang="ts">
defineProps({
  /**
     * Label to display for the tab
     */
  label: {
    type: String,
    required: true,
  },
  /**
     * Select which tab should be active
     */
  active: {
    type: Boolean,
    default: false,
  },
  /**
     * Preiew block are bordered and have small padding.
     */
  preview: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div
    class="code-block"
    :class="{
      active: active,
      'p-4 border-2 border-t-0 border-gray-100 dark:border-gray-800 rounded-b-lg': preview
    }"
  >
    <slot />
  </div>
</template>

<style scoped>
.code-block {
  display: none;
}

.code-block.active {
  display: block;
}
</style>
