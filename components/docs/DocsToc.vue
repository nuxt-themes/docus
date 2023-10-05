<script setup lang="ts">
import appConfig from '#build/app.config'

const { tokens } = appConfig

const { toc, page } = useContent()
const { config } = useDocus()
const emit = defineEmits(['move'])
</script>

<template>
  <div
    class="docs-toc"
    :class="[tokens.docsToc.root]"
  >
    <template v-if="toc?.links?.length">
      <div
        class="docs-toc-title"
        :class="[tokens.docsToc.title]"
      >
        <span>Table of Contents</span>
      </div>

      <DocsTocLinks
        :links="toc.links"
        @move="emit('move')"
      />
    </template>
    <div
      class="docs-toc-bottom"
      :class="[tokens.docsToc.bottom]"
    >
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
