<template>
  <AppContainer aside>
    <AppPage>
      <div class="mb-10">
        <h1
          class="flex items-center justify-between text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100"
        >
          <span class="flex-1">Releases</span>
        </h1>
      </div>
      <div class="prose max-w-none dark:prose-dark nuxt-content">
        <div v-for="release of releases" :key="release.name">
          <h2 :id="release.name" class="flex items-center justify-between">
            <a :href="`#${release.name}`">
              {{ release.name }}
            </a>
            <span class="text-base font-normal text-gray-500">{{ formatDate($i18n.local, release) }}</span>
          </h2>
          <NuxtContent :document="release" />
        </div>
      </div>
      <hr class="mt-10 mb-4 border-gray-200 dark:border-gray-800" />
      <template #toc>
        <PageToc :toc="toc" title="Versions" />
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
    const { $content } = useContext()
    const releases = ref()
    const toc = ref()

    useFetch(async () => {
      const document = await $content('/_docus/repo/github').fetch()

      releases.value = document.releases
      toc.value = document.releases?.map(release => ({
        id: release.name,
        depth: 2,
        text: release.name
      }))
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
  }
})
</script>
