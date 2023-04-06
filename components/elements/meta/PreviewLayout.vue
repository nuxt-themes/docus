<script setup lang="ts">
defineProps({
  column: {
    type: Boolean,
    default: false
  },
})
</script>

<template>
  <div class="preview-layout">
    <slot />
  </div>
</template>

<style scoped lang="ts">
css({
  '.preview-layout': {
    display: 'flex',
    flexDirection: (props) => props.column ? 'column' : 'row',
    alignItems: 'flex-start',
    gap: '1rem',
    '& :deep(> *)': {
      margin: '0px !important',
    }
  },
})
</style>