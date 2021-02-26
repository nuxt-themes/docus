<template>
  <Page>
    <div class="mb-10">
      <h1 class="flex items-center justify-between text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
        <span class="flex-1">Releases</span>
      </h1>
    </div>
    <div class="max-w-none prose dark:prose-dark nuxt-content">
      <div v-for="release of releases" :key="release.name">
        <h2 :id="release.name" class="flex items-center justify-between">
          <a :href="`#${release.name}`">
            {{ release.name }}
          </a>
          <span
            class="text-base font-normal text-gray-500"
          >{{ formatDate(release) }}</span>
        </h2>

        <NuxtContent :document="release.body" />
      </div>
    </div>
    <hr class="mt-10 mb-4 border-gray-200 dark:border-gray-800">
    <template #toc>
      <Toc :toc="toc" />
    </template>
  </Page>
</template>

<script>
import { $fetch } from 'ohmyfetch/node'

export default {
  layout ({ $docus }) {
    return $docus.settings.layout
  },
  async asyncData () {
    // TODO: find loopback url
    const releases = await $fetch('http://localhost:4000/_docus/releases')
    return {
      releases
    }
  },
  head () {
    return {
      title: 'Releases'
    }
  },
  computed: {
    settings () {
      return this.$docus.settings
    },
    toc () {
      return this.releases.map(release => ({ id: release.name, depth: 2, text: release.name }))
    }
  },
  methods: {
    formatDate (release) {
      const date = new Date(release.date)

      return date.toLocaleDateString(this.$i18n.locale)
    }
  }
}
</script>
