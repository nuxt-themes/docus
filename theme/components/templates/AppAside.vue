<template>
  <aside
    class="fixed z-40 inset-0 flex-none h-full bg-black bg-opacity-25 w-full lg:bg-white lg:dark:bg-gray-900 lg:static lg:h-auto lg:overflow-y-visible lg:pt-0 lg:w-60 xl:w-72 lg:block"
    :class="{ 'hidden': !menu }"
    @click="menu = false"
  >
    <div class="h-full overflow-y-auto lg:h-auto lg:block lg:sticky lg:bg-transparent overflow-hidden lg:top-18 bg-white dark:bg-gray-900 mr-24 lg:mr-0">
      <div class="hidden lg:block h-12 pointer-events-none absolute inset-x-0 z-10 bg-gradient-to-b from-white dark:from-gray-900"></div>

      <nav class="px-1 pt-6 overflow-y-auto font-medium text-base sm:px-3 xl:px-5 lg:text-sm pb-10 lg:pt-10 lg:pb-16 lg:h-(screen-18)">
        <ul class="lg:hidden space-y-8 mb-8">
          <li v-if="settings.algolia">
            <AlgoliaSearchBox :options="settings.algolia" :settings="settings" />
          </li>
          <li>
            <NuxtLink
              v-if="lastRelease"
              to="/releases"
              class="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 transition-colors duration-200 font-medium px-3 py-2"
              exact-active-class="text-primary-500"
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
            <h5 class="px-3 mb-3 lg:mb-3 uppercase tracking-wide font-semibold text-sm lg:text-xs text-gray-900 dark:text-gray-100">{{ category }}</h5>

            <ul>
              <li v-for="doc of docs" :key="doc.slug" class="text-gray-700 dark:text-gray-300">
                <NuxtLink
                  :to="localePath(doc.to)"
                  class="px-3 py-2 transition-colors duration-200 relative block text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md"
                  exact-active-class="text-primary-500 dark:text-primary-500 hover:text-primary-500 bg-primary-50 dark:bg-transparent dark:hover:text-primary-500"
                >
                  {{ doc.menuTitle || doc.title }}

                  <client-only>
                    <span
                      v-if="isDocumentNew(doc)"
                      class="animate-pulse rounded-full bg-primary-500 opacity-75 h-2 w-2"
                    />
                  </client-only>
                </NuxtLink>
              </li>
            </ul>
          </li>

          <li class="lg:hidden">
            <h5 class="px-3 mb-3 lg:mb-3 uppercase tracking-wide font-semibold text-sm lg:text-xs text-gray-900 dark:text-gray-100">More</h5>

            <div class="flex items-center space-x-4 px-3 py-2">
              <a
                v-if="settings.twitter"
                :href="`https://twitter.com/${settings.twitter}`"
                target="_blank"
                rel="noopener noreferrer"
                title="Twitter"
                name="Twitter"
                class="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 transition-colors duration-200"
              >
                <IconTwitter class="w-5 h-5" />
              </a>
              <a
                v-if="settings.github"
                :href="githubUrls.repo"
                target="_blank"
                rel="noopener noreferrer"
                title="Github"
                name="Github"
                class="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 transition-colors duration-200"
              >
                <IconGithub class="w-5 h-5" />
              </a>

              <LangSwitcher />
              <ColorSwitcher />
            </div>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'settings',
      'githubUrls',
      'lastRelease'
    ]),
    menu: {
      get () {
        return this.$store.state.menu.open
      },
      set (val) {
        this.$store.commit('menu/toggle', val)
      }
    },
    categories () {
      return this.$store.state.categories[this.$i18n.locale]
    }
  },
  methods: {
    isCategoryActive (documents) {
      return documents.some(document => document.to === this.$route.fullPath)
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
