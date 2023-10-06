<script setup lang="ts">
const { toc, page } = useContent()
const { config } = useDocus()
const emit = defineEmits(['move'])
</script>

<template>
  <div class="docs-toc flex flex-col gap-2">
    <template v-if="toc?.links?.length">
      <div class="docs-toc-title hidden lg:block overflow-hidden text-sm font-semibold">
        <span>Table of Contents</span>
      </div>

      <DocsTocLinks
        :links="toc.links"
        @move="emit('move')"
      />
    </template>
    <div class="docs-toc-bottom text-sm py-2 text-secondary-static">
      <div v-if="config?.github?.edit">
        <DocsEditOn
          v-slot="{ url }"
          :page="page"
        >
          <ProseA :href="url">
            Edit this page on GitHub
          </ProseA>
        </DocsEditOn>
      </div>
    </div>
  </div>
</template>
