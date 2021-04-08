<template>
  <AppContainer aside>
    <AppPage>
      <PageContent :page="page" />
      <hr class="mt-10 mb-4 border-gray-100 dark:border-gray-800" />
      <PagePrevNext :prev="prev" :next="next" />
      <template #toc>
        <PageToc v-if="!page.hideToc" :title="page.tocTitle" :toc="page.toc" />
      </template>
    </AppPage>
  </AppContainer>
</template>

<script>
export default {
  props: {
    page: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      prev: null,
      next: null
    }
  },
  async fetch() {
    const language = this.$i18n.locale
    const draft = this.$docus.ui?.draft ? undefined : false
    const [prev, next] = await this.$content({ deep: true })
      .where({ language, draft, menu: { $ne: false } })
      .only(['title', 'slug', 'to', 'category'])
      .sortBy('position', 'asc')
      .surround(this.page.slug, { before: 1, after: 1 })
      .fetch()

    this.prev = prev
    this.next = next
  }
}
</script>
