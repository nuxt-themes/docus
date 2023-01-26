<script setup lang="ts">
const { page } = useContent()
const docus = useDocus()
</script>

<template>
  <div v-if="page" class="docs-page-bottom">
    <div v-if="docus?.github?.edit" class="edit-link">
      <Icon name="uil:edit" />
      <EditOnLink v-slot="{ url }" :page="page">
        <ProseA :to="url">
          <span>
            Edit this page on GitHub
          </span>
        </ProseA>
      </EditOnLink>
    </div>

    <!-- Need to be supported by @nuxt/content -->
    <span v-if="page?.mtime">Updated on <b>{{ new Intl.DateTimeFormat('en-US').format(Date.parse(page.mtime)) }}</b></span>
  </div>
</template>

<style scoped lang="ts">
css({
  '.docs-page-bottom': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: '{space.4}',
    marginTop: '{space.8}',
    fontSize: '{fontSize.sm}',
    color: '{color.gray.500}',
    '@dark': {
      color: '{color.gray.400}'
    },
    '.edit-link': {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      gap: '{space.2}'
    }
  }
})
</style>
