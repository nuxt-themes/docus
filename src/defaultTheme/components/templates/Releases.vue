<template>
  <AppPage>
    <section class="mt-4 xl:mt-0 px-4 sm:px-6">
      <h1 class="flex-1 text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
        {{ page.title }}
      </h1>
      <p v-if="page.description" class="mt-4 text-lg font-medium text-gray-500 dark:text-gray-400">
        {{ page.description }}
      </p>
      <hr class="mt-4 border-gray-100 dark:border-gray-800 dark:border-opacity-50" />
    </section>

    <PageMobileToc title="Versions" :toc="toc" />

    <div class="px-4 sm:px-6 docus-content">
      <div v-for="release of releases" :key="release.name">
        <div class="flex items-baseline justify-between">
          <ProseH2 :id="release.name">
            <a :href="`#${release.name}`">
              {{ release.name }}
            </a>
          </ProseH2>
          <span class="text-sm font-normal text-gray-500">{{ formatDate($i18n.local, release) }}</span>
        </div>
        <DocusContent :document="release" class="docus-content overflow-hidden" />
      </div>
    </div>

    <template #toc>
      <PageToc :toc="toc" title="Versions" />
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
  setup() {
    const { $docus } = useContext()
    const releases = ref()
    const toc = ref()

    useFetch(async () => {
      const document = await $docus.data('github-releases')

      releases.value = document.releases

      toc.value = document.releases?.map(release => ({
        id: release.name,
        depth: 2,
        text: release.name
      }))
    })

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

    const formatDate = (locale, release) => {
      const currentLocale = locale || 'en'

      const date = new Date(release.date)

      return date.toLocaleDateString(currentLocale)
    }

    return {
      releases,
      toc,
      formatDate
    }
  },
  templateOptions: {
    aside: true
  }
})
</script>
