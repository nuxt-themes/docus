<template>
  <div
    class="sticky top-0 z-40 w-full bg-white border-b border-gray-100 lg:z-50 app-header dark:border-gray-800 bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-80"
    @click="scrollToTop"
  >
    <div class="flex flex-none px-4 mx-auto max-w-8xl ">
      <!-- Left section -->
      <!-- Mobile menu button -->
      <button
        class="flex items-center justify-center sm:p-2 lg:hidden focus:outline-none"
        @click.stop="menu = !menu"
      >
        <IconMenuAlt class="w-6 h-6 " />
      </button>
      <div class="flex items-center justify-center flex-1 lg:flex-none">
        <DLogo :settings="settings" />
      </div>

      <!-- Middle section -->
      <div class="flex items-center justify-end lg:flex-auto h-18 ">
        <DAlgoliaSearchBox
          v-if="settings.algolia"
          :options="settings.algolia"
          :settings="settings"
          class="w-14 lg:flex-1 lg:px-2"
        />
        <div v-else class="flex lg:hidden">
          <DColorSwitcher />
        </div>

        <!-- Desktop: Right section -->
        <div
          class="items-center justify-end hidden space-x-2 lg:flex md:space-x-4 xl:w-64"
        >
          <slot name="desktop-right" />
          <NuxtLink
            v-if="lastRelease"
            :to="localePath('/releases')"
            class="hidden font-medium text-gray-400 transition-colors duration-200 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 lg:block"
            exact-active-class="text-primary-500 dark:text-primary-400"
          >{{ lastRelease }}</NuxtLink>

          <DLangSwitcher />
          <DColorSwitcher />
          <DSocialIcons />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    settings () {
      return this.$docus.settings
    },
    lastRelease () {
      return this.$docus.lastRelease
    },
    menu: {
      get () {
        return this.$menu.open
      },
      set (val) {
        this.$menu.open = val
      }
    }
  },
  methods: {
    scrollToTop () {
      if (window.innerWidth >= 1280) {
        return
      }
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="postcss">
.app-header {
  backdrop-filter: blur(12px);
  /* background-color: hsla(0, 0%, 100%, 0.9); */
}

.dark {
  & .app-header {
    /* background-color: rgba(17, 24, 39, 0.75); */
  }
}
</style>
