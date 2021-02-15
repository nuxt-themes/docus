<template>
  <aside
    class="fixed inset-0 z-40 flex-none w-full h-full bg-black bg-opacity-25 lg:bg-white lg:dark:bg-gray-900 lg:static lg:h-auto lg:overflow-y-visible lg:pt-0 lg:w-60 xl:w-72 lg:block"
    :class="{ 'hidden': !menu }"
    @click="menu = false"
  >
    <div class="h-full mr-24 overflow-hidden overflow-y-auto bg-white lg:h-auto lg:block lg:sticky lg:bg-transparent lg:top-18 dark:bg-gray-900 lg:mr-0">
      <div class="absolute inset-x-0 z-10 hidden h-12 pointer-events-none lg:block bg-gradient-to-b from-white dark:from-gray-900"></div>

      <nav class="px-1 pt-6 overflow-y-auto font-medium text-base sm:px-3 xl:px-5 lg:text-sm pb-10 lg:pt-10 lg:pb-16 lg:h-(screen-18)">
        <ul v-if="settings.algolia || lastRelease" class="mb-8 space-y-8 lg:hidden">
          <li v-if="settings.algolia">
            <AlgoliaSearchBox :options="settings.algolia" :settings="settings" />
          </li>
          <li v-if="lastRelease">
            <NuxtLink
              to="/releases"
              class="px-3 py-2 font-medium text-gray-400 transition duration-200 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
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
            <h5 v-if="category" class="px-3 mb-3 text-sm font-semibold tracking-wide text-gray-900 uppercase lg:mb-3 lg:text-xs dark:text-gray-100">{{ category }}</h5>

            <ul>
              <li v-for="doc of docs" :key="doc.slug">
                <NuxtLink
                  :to="$contentLocalePath(doc.to)"
                  class="relative block px-3 py-2 transition duration-200 rounded-md hover:text-gray-900 dark:hover:text-gray-100"
                  :class="{ 'text-primary-500 dark:text-primary-400 hover:text-primary-500 bg-primary-50 dark:bg-primary-900 dark:hover:text-primary-400': isLinkActive(doc) }"
                >
                  {{ doc.menuTitle || doc.title }}

                  <client-only>
                    <span
                      v-if="isDocumentNew(doc)"
                      class="w-2 h-2 rounded-full opacity-75 animate-pulse bg-primary-500"
                    />
                  </client-only>
                </NuxtLink>
              </li>
            </ul>
          </li>

          <li class="lg:hidden">
            <h5 class="px-3 mb-3 text-sm font-semibold tracking-wide text-gray-900 uppercase lg:mb-3 lg:text-xs dark:text-gray-100">More</h5>

            <div class="flex items-center px-3 py-2 space-x-4">
              <a
                v-if="settings.twitter"
                :href="`https://twitter.com/${settings.twitter}`"
                target="_blank"
                rel="noopener noreferrer"
                title="Twitter"
                name="Twitter"
                class="text-gray-400 transition duration-200 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
              >
                <IconTwitter class="w-5 h-5" />
              </a>
              <a
                v-if="settings.github.repo"
                :href="repositoryUrl"
                target="_blank"
                rel="noopener noreferrer"
                title="Github"
                name="Github"
                class="text-gray-400 transition duration-200 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
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
      'repositoryUrl',
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
