<template>
  <AppContainer aside>
    <AppPage>
      <PageContent :page="page" />

      <hr class="mt-10 mb-8 border-gray-100 dark:border-gray-800 dark:border-opacity-50" />

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
    const { $docus } = useContext()
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

      // do not remove setTimeout (no headers)
      setTimeout(() => {
        const headings = [
          ...document.querySelectorAll('.docus-content h1'),
          ...document.querySelectorAll('.docus-content h2'),
          ...document.querySelectorAll('.docus-content h3')
        ]
        headings.forEach(heading => {
          heading.addEventListener('click', e => {
            e.preventDefault()
            const hash = e.target.href.split('#').pop()
            scrollToHeading(hash, '--docs-scroll-margin-block')
          })
        })
      }, 500)
    })

    useFetch(async ctx => {
      const language = ctx.$i18n.locale
      const draft = $docus.ui?.draft ? undefined : false

      const [prevLink, nextLink] = await $docus
        .search({ deep: true })
        .where({ language, draft, navigation: { $ne: false } })
        .only(['title', 'slug', 'to', 'category'])
        .sortBy('position', 'asc')
        .surround(props.page.slug, { before: 1, after: 1 })
        .fetch()

      prev.value = prevLink
      next.value = nextLink
    })

    return {
      prev,
      next
    }
  }
})
</script>
