<template>
  <AppPage>
    <PageContent :page="page">
      <template #mobile-toc>
        <PageMobileToc :title="page.toc.title" :toc="page.toc.links" />
      </template>
    </PageContent>

    <EditOnGithub :page="page" />

    <template #prev-next>
      <PagePrevNext :prev="prev" :next="next" />
    </template>

    <template #toc>
      <PageToc v-if="!page.hideToc" :title="page.toc.title" :toc="page.toc.links" />
    </template>
  </AppPage>
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
        .where({
          language,
          draft,
          parent: props.page.parent,
          // Ignore pages without any title
          // Most of `index` pages are use for parenting configuration and they don't need to be listed here
          title: { $not: { $type: 'undefined' } },
          navigation: {
            $and: [
              // Ignore contents that has disabled navigations
              { $ne: false },
              // Ignore contents with navigation redirect
              { $containsNone: ['redirect'] }
            ]
          }
        })
        .only(['title', 'slug', 'to', 'category'])
        .sortBy('position', 'asc')
        .surround(props.page.path, { before: 1, after: 1 })
        .fetch()

      prev.value = prevLink
      next.value = nextLink
    })

    return {
      prev,
      next
    }
  },
  templateOptions: {
    aside: true,
    fluid: false
  }
})
</script>
