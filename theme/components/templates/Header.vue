<template>
  <div
    class="sticky top-0 z-40 w-full px-4 border-b border-gray-100 lg:z-50 app-header dark:border-gray-800"
    @click="scrollToTop"
  >
    <div class="flex flex-none mx-auto max-w-8xl">
      <button
        class="flex items-center justify-center p-4 lg:hidden focus:outline-none"
        @click.stop="menu = !menu"
      >
        <IconMenuAlt class="w-6 h-6 " />
      </button>

      <div class="flex items-center justify-center flex-1 lg:flex-none">
        <Logo :settings="settings" />
      </div>

      <div class="flex items-center justify-end lg:flex-auto h-18 ">
        <AlgoliaSearchBox
          v-if="settings.algolia"
          :options="settings.algolia"
          :settings="settings"
          class="w-14 lg:flex-1 lg:px-2"
        />

        <div
          class="items-center justify-end hidden space-x-2 lg:flex md:space-x-4 xl:w-64"
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

          <SocialIcons />
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
