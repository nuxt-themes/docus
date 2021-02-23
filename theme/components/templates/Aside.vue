<template>
  <aside
    class="fixed inset-0 z-40 flex-none w-full h-full bg-black bg-opacity-25 lg:bg-white lg:dark:bg-gray-900 lg:static lg:h-auto lg:overflow-y-visible lg:pt-0 lg:w-60 xl:w-72 lg:block"
    :class="{ 'hidden': !$menu.open }"
    @click="$menu.open = false"
  >
    <div class="h-full mr-24 overflow-hidden overflow-y-auto bg-white sm:mr-64 lg:h-auto lg:block lg:sticky lg:bg-transparent lg:top-18 dark:bg-gray-900 lg:mr-0" @click.stop>
      <div class="absolute inset-x-0 z-10 hidden h-12 pointer-events-none lg:block bg-gradient-to-b from-white dark:from-gray-900"></div>

      <nav class="pt-6 overflow-y-auto font-medium text-base sm:px-3 xl:px-5 lg:text-sm pb-10 lg:pt-10 lg:pb-16 lg:h-(screen-18)">
        <AsideTop />
        <ul v-if="lastRelease" class="mb-8 space-y-8 lg:hidden">
          <li v-if="lastRelease">
            <NuxtLink
              to="/releases"
              class="px-4 py-2 font-medium text-gray-400 transition duration-200 lg:px-3 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
              exact-active-class="text-primary-500 dark:text-primary-400"
            >{{ lastRelease.name }}</NuxtLink>
          </li>
        </ul>

        <ul class="space-y-8">
          <li
            v-for="(docs, category) in categories"
            :key="category"
            :class="{
              'active': isCategoryActive(docs)
            }"
          >
            <h5 v-if="category" class="px-4 mb-3 text-sm font-semibold tracking-wide text-gray-900 uppercase lg:px-3 lg:mb-3 lg:text-xs dark:text-gray-100">{{ category }}</h5>
            <ul>
              <li v-for="doc of docs" :key="doc.slug">
                <NuxtLink
                  :to="$contentLocalePath(doc.to)"
                  class="relative flex items-center justify-between px-4 py-2 transition duration-200 lg:px-3 lg:rounded-md hover:text-gray-900 dark:hover:text-gray-100"
                  :class="{ 'text-primary-500 dark:text-primary-400 hover:text-primary-500 bg-primary-50 dark:bg-primary-900 dark:hover:text-primary-400': isLinkActive(doc) }"
                >
                  {{ doc.menuTitle || doc.title }}

                  <client-only>
                    <span
                      v-if="doc.draft"
                      class="w-2 h-2 bg-yellow-500 rounded-full opacity-75"
                    />
                    <span
                      v-else-if="isDocumentNew(doc)"
                      class="w-2 h-2 rounded-full opacity-75 animate-pulse bg-primary-500"
                    />
                  </client-only>
                </NuxtLink>
              </li>
            </ul>
          </li>
        </ul>
        <AsideBottom />
      </nav>
    </div>
  </aside>
</template>

<script>
export default {
  computed: {
    settings () {
      return this.$docus.settings
    },
    categories () {
      return this.$docus.categories[this.$i18n.locale]
    },
    lastRelease () {
      return this.$docus.lastRelease
    }
  },
  methods: {
    isCategoryActive (documents) {
      return documents.some(document => this.isLinkActive(document))
    },
    isLinkActive (doc) {
      return (this.$route.path || '/') === this.$contentLocalePath(doc.to)
    },
    isDocumentNew (document) {
      if (process.server) {
        return
      }
      if (!document.version || document.version <= 0) {
        return
      }

      const version = localStorage.getItem(`document-${document.slug}-version`)
      if (document.version > Number(version)) {
        return true
      }

      return false
    }
  }
}
</script>
