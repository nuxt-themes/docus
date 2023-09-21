<script setup lang="ts">
import appConfig from '#build/app.config'

const { tokens } = appConfig

const { page } = useContent()
const { config } = useDocus()
</script>

<template>
  <div
    v-if="page"
    class="docs-page-bottom"
    :class="[tokens.docsContentBottom.root]"
  >
    <div
      v-if="config?.github?.edit"
      class="edit-link"
      :class="[tokens.docsContentBottom.editLink]"
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

<style scoped lang="ts">

</style>
