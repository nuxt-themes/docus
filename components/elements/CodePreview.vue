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
   * Whether or not the tab is active
   * TODO: does not seems to work
   */
  active: {
    type: Boolean,
    default: false
  },
  column: {
    type: Boolean,
    default: false
  },
})
</script>

<template>
  <div
    class="code-preview flex flex-start overflow-auto gap-4 p-4"
    :class="[column ? 'flex-col' : 'flex-row']"
  >
    <slot />
  </div>
</template>

<style scoped lang="ts">
// css({
//   '.code-preview': {
//     '&:has(.sandbox)': {
//       padding: 0,
//       ':deep(.sandbox)': {
//         border: 0,
//         borderRadius: 0
//       }
//     },
//     '& :deep(> *)': {
//       margin: '0px !important',
//     }
//   },
// })
</style>
