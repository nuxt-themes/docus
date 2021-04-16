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
            <span class="text-base font-normal text-gray-500">{{ formatDate(release) }}</span>
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
import { defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    page: {
      type: Object,
      require: true
    }
  },
  setup(props) {
    const { $i18n } = useContext()

    const releases = computed(() => props.page?.data?.repository?.releases || [])

    const toc = computed(() =>
      releases.value.releases?.map(release => ({
        id: release.name,
        depth: 2,
        text: release.name
      }))
    )

    const formatDate = release => {
      const date = new Date(release.date)

      return date.toLocaleDateString($i18n.locale)
    }

    return {
      toc,
      formatDate
    }
  }
})
</script>
