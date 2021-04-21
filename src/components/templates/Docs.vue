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
import Vue from 'vue'
import { defineComponent, ref, useContext, useFetch, onMounted } from '@nuxtjs/composition-api'
import CopyButton from '../../components/atoms/CopyButton.vue'
import { scrollToHeading } from '../../components/utils'

export default defineComponent({
  props: {
    page: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { $i18n, $docus, $content } = useContext()
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
        const blocks = document.getElementsByClassName('nuxt-content-highlight')

        for (const block of blocks) {
          const Button = Vue.extend(CopyButton)
          const component = new Button().$mount()
          block.appendChild(component.$el)
        }

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
