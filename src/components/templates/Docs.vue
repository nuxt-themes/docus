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
import { defineComponent, ref, useContext, useFetch } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    page: {
      type: Object,
      required: true
    }
  },
  setup() {
    const { $i18n, $docus, $content } = useContext()
    const prev = ref(null)
    const next = ref(null)

    useFetch(async () => {
      const language = $i18n.locale
      const draft = $docus.ui?.draft ? undefined : false

      const [prev, next] = await $content({ deep: true })
        .where({ language, draft, menu: { $ne: false } })
        .only(['title', 'slug', 'to', 'category'])
        .sortBy('position', 'asc')
        .surround(props.page.slug, { before: 1, after: 1 })
        .fetch()

      prev.value = prev
      next.value = next
    })

    return {
      prev,
      next
    }
  }
})
</script>
