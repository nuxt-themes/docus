<template>
  <AppContainer aside>
    <AppPage>
      <PageContent :page="page" />

      <hr class="mt-10 mb-4 border-gray-100 dark:border-gray-800" />

      <PagePrevNext :prev="prev" :next="next" />

      <template #toc>
        <PageToc v-if="!page.hideToc" :title="page.toc.title" :toc="page.toc.links" />
      </template>
    </AppPage>
  </AppContainer>
</template>

<script>
import { defineComponent, ref, useContext, useFetch, onMounted } from '@nuxtjs/composition-api'
import { scrollToHeading } from '../../utils'

export default defineComponent({
  props: {
    page: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { i18n, $docus } = useContext()
    const prev = ref(null)
    const next = ref(null)

    onMounted(() => {
      if (window.location.hash) {
        const hash = window.location.hash.replace('#', '')

        // do not remove setTimeout (wrong scroll pos)
        setTimeout(() => {
          scrollToHeading(hash, '--docs-scroll-margin-block')
        }, 300)
      }

      setTimeout(() => {
        const headings = [
          ...document.querySelectorAll('.nuxt-content h2'),
          ...document.querySelectorAll('.nuxt-content h3')
        ]
        headings.forEach(heading => {
          heading.addEventListener('click', e => {
            e.preventDefault()
            const hash = e.target.href.split('#').pop()
            scrollToHeading(hash, '--docs-scroll-margin-block')
          })
        })
      }, 100)
    })

    useFetch(async () => {
      const language = i18n.locale
      const draft = $docus.ui?.draft ? undefined : false

      const [_prev, _next] = await $docus
        .search({ deep: true })
        .where({ language, draft, menu: { $ne: false } })
        .only(['title', 'slug', 'to', 'category'])
        .sortBy('position', 'asc')
        .surround(props.page.slug, { before: 1, after: 1 })
        .fetch()

      prev.value = _prev
      next.value = _next
    })

    return {
      prev,
      next
    }
  }
})
</script>
