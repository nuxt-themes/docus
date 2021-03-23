<template>
  <AppContainer aside>
    <AppPage>
      <div class="mb-6" :class="{ 'border-b border-gray-200 dark:border-gray-800 pb-6': page.description }">
        <h1 class="flex items-center justify-between text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          <span class="flex-1">{{ page.title }}</span>
          <span v-if="page.draft" class="inline-block px-3 py-1 mr-2 text-base font-medium leading-5 tracking-tight text-yellow-500 bg-yellow-100 rounded-full items-flex dark:bg-yellow-800 dark:text-yellow-400">Draft</span>
          <DBadge v-if="page.badge" class="font-medium">{{ page.badge }}</DBadge>
        </h1>
        <p v-if="page.description" class="mt-2 text-lg text-gray-600 dark:text-gray-300">{{ page.description }}</p>
      </div>
      <slot />
      <PageBottom :document="page" />
      <hr class="mt-10 mb-4 border-gray-100 dark:border-gray-800">
      <PagePrevNext :prev="prev" :next="next" />
      <template #toc>
        <PageToc v-if="!page.fullscreen" :toc="page.toc" />
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
  data () {
    return {
      prev: null,
      next: null
    }
  },
  async fetch () {
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
