<script setup lang="ts">
const { page } = useContent()
const docus = useDocus()
</script>

<template>
  <div v-if="page" class="docs-page-bottom">
    <div class="edit-link">
      <EditOnLink v-if="docus?.socials?.github && docus?.github?.edit" :page="page" />
      <span v-if="page.mtime">Updated on: {{ new Intl.DateTimeFormat('en-US').format(Date.parse(page.mtime)) }}</span>
    </div>
  </div>
</template>

<style scoped lang="ts">
css({
  '.docs-page-bottom': {
    display: 'flex',
    flexDirection: 'column-reverse',
    justifyContent: 'space-between',
    gap: '{space.4}',
    marginTop: '{space.8}',
    fontSize: '{fontSize.sm}',
    color: '{color.gray.500}',
    '@dark': {
      color: '{color.gray.400}'
    },
    '.edit-link': {
      display: 'flex',
      flexDirection: 'column',
      flex: '1',
      width: '100%',
      gap: '{space.4}',
      '@md': {
        width: '50%'
      },
      span: {
        display: 'flex',
        alignItems: 'center'
      }
    }
  }
})
</style>
