<script setup lang="ts">
const { toc } = useContent()
const emit = defineEmits(['move'])
</script>

<template>
  <div class="docs-toc">
    <template v-if="toc?.links?.length">
      <div class="docs-toc-title">
        <span>Table of Contents</span>
      </div>

      <DocsTocLinks :links="toc.links" @move="emit('move')" />
    </template>
  </div>
</template>

<style scoped lang="ts">
css({
  '.docs-toc': {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    '.docs-toc-title': {
      display: 'none',
      '@mq.lg': {
        display: 'block',
        overflow: 'hidden',
        fontSize: '{text.sm.fontSize}',
        lineHeight: '{text.sm.lineHeight}',
        fontWeight: '{fontWeights.semibold}'
      }
    }
  }
})
</style>