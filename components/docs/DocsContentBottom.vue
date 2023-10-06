<script setup lang="ts">
const { page } = useContent()
const { config } = useDocus()
</script>

<template>
  <div
    v-if="page"
    class="docs-page-bottom flex items-center justify-between gap-4 mt-8 text-sm text-secondary-static"
  >
    <div
      v-if="config?.github?.edit"
      class="edit-link flex flex-1 items-center gap-2"
    >
      <Icon name="uil:edit" />
      <DocsEditOn
        v-slot="{ url }"
        :page="page"
      >
        <ProseA :href="url">
          <span>
            Edit this page on GitHub
          </span>
        </ProseA>
      </DocsEditOn>
    </div>

    <!-- Need to be supported by @nuxt/content -->
    <span v-if="page?.mtime">Updated on <b>{{ new Intl.DateTimeFormat('en-US').format(Date.parse(page.mtime)) }}</b></span>
  </div>
</template>
