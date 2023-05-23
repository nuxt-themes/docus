<script setup lang="ts">
const { toc, page } = useContent()
const { config } = useDocus()
const emit = defineEmits(['move'])
</script>

<template>
  <div class="docs-toc">
    <template v-if="toc?.links?.length">
      <div class="docs-toc-title">
        <span>Table of Contents</span>
      </div>

      <DocsTocLinks
        :links="toc.links"
        @move="emit('move')"
      />
    </template>
    <div class="docs-toc-bottom">
      <div v-if="config?.github?.edit">
        <DocsEditOn v-slot="{ url }" :page="page">
          <ProseA :href="url">
            Edit this page on GitHub
          </ProseA>
        </DocsEditOn>
      </div>
    </div>
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
      '@lg': {
        display: 'block',
        overflow: 'hidden',
        fontSize: '{text.sm.fontSize}',
        lineHeight: '{text.sm.lineHeight}',
        fontWeight: '{fontWeight.semibold}'
      }
    },
    '.docs-toc-bottom': {
      fontSize: '{text.sm.fontSize}',
      lineHeight: '{text.sm.lineHeight}',
      color: '{elements.text.secondary.color.static}',
      py: '{space.2}',
    }
  }
})
</style>
