<script setup lang="ts">
defineProps({
  /**
   * Label to display for the tab
   */
  label: {
    type: String,
    required: true
  },
  /**
   * Select which tab should be active
   */
  active: {
    type: Boolean,
    default: false
  },
  /**
   * Preview block are bordered and have small padding.
   */
  preview: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div
    class="code-preview"
    :class="{
      active,
      'rounded-lg p-4': preview,
    }"
  >
    <slot />
  </div>
</template>

<style scoped>
.code-preview {
  display: none;
}

.code-preview.active {
  display: block;
}
</style>
