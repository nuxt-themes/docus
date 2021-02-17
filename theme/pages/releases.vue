<template>
  <div class="flex w-full pt-10 pb-24 lg:pb-16">
    <div class="flex-auto min-w-0 px-4 sm:px-6 xl:px-8">
      <div class="mb-10">
        <h1 class="flex items-center justify-between text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">Releases</h1>
      </div>

      <div class="prose dark:prose-dark max-w-none">
        <div v-for="release of releases" :key="release.name">
          <h2 :id="release.name" class="flex items-center justify-between">
            {{ release.name }}
            <span
              class="text-base font-normal text-gray-500"
            >{{ formatDate(release) }}</span>
          </h2>

          <div class="nuxt-content" v-html="release.body" />
        </div>
      </div>
    </div>

    <AppToc :toc="toc" />
  </div>
</template>

<script>
export default {
  layout ({ store }) {
    return store.state.settings.layout || 'docus'
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
    releases () {
      return this.$docus.releases
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
