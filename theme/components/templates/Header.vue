<template>
  <div
    class="sticky top-0 z-40 w-full px-4 border-b border-gray-100 lg:z-50 app-header dark:border-gray-800"
    @click="scrollToTop"
  >
    <div class="flex flex-none mx-auto max-w-8xl">
      <Logo :settings="settings" />

      <div class="flex items-center justify-end flex-auto h-18 ">
        <AlgoliaSearchBox
          v-if="settings.algolia"
          :options="settings.algolia"
          :settings="settings"
          class="md:flex-1 md:px-4 lg:px-2"
        />

        <div
          class="flex items-center justify-end space-x-2 md:space-x-4 xl:w-64"
        >
          <NuxtLink
            v-if="lastRelease"
            :to="localePath('/releases')"
            class="hidden font-medium text-gray-400 transition-colors duration-200 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 lg:block"
            exact-active-class="text-primary-500 dark:text-primary-400"
            >{{ lastRelease.name }}</NuxtLink
          >

          <LangSwitcher />

          <ColorSwitcher />

          <a
            v-if="settings.twitter"
            :href="`https://twitter.com/${settings.twitter}`"
            target="_blank"
            rel="noopener noreferrer"
            title="Twitter"
            name="Twitter"
            class="text-gray-400 transition-colors duration-200 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
          >
            <IconTwitter class="w-4 h-4 md:w-5 md:h-5" />
          </a>

          <a
            v-if="settings.github.repo"
            :href="$docus.repoUrl"
            target="_blank"
            rel="noopener noreferrer"
            title="Github"
            name="Github"
            class="text-gray-400 transition-colors duration-200 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
          >
            <IconGithub class="w-4 h-4 md:w-5 md:h-5" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    aside: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    settings() {
      return this.$docus.settings;
    },
    lastRelease() {
      return this.$docus.lastRelease;
    },
    menu: {
      get() {
        return this.$menu.open;
      },
      set(val) {
        this.$menu.open = val;
      }
    }
  },
  methods: {
    scrollToTop() {
      if (window.innerWidth >= 1280) {
        return;
      }
      window.scrollTo(0, 0);
    }
  }
};
</script>

<style lang="postcss">
.app-header {
  backdrop-filter: blur(12px);
  background-color: hsla(0, 0%, 100%, 0.9);
}

.dark {
  & .app-header {
    background-color: rgba(17, 24, 39, 0.75);
  }
}
</style>
