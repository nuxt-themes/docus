<template>
  <header class="d-header">
    <div class="flex flex-none h-full d-container-content">
      <NavigationButton v-if="aside" />

      <div :class="[aside ? 'justify-center' : 'justify-start']" class="flex items-center flex-1 lg:flex-none">
        <Logo :settings="settings" />
      </div>

      <div class="hidden lg:flex lg:flex-1 items-center">
        <HeaderNavigation />
      </div>

      <div class="flex items-center justify-end lg:flex-none">
        <AlgoliaSearchBox
          v-if="settings.algolia"
          :options="settings.algolia"
          :settings="settings"
          class="w-14 lg:flex-1 lg:px-2"
        />

        <div v-else class="flex lg:hidden">
          <ColorSwitcher />
        </div>

        <!-- Desktop: Right section -->
        <div class="items-center justify-end hidden lg:flex">
          <NuxtLink
            v-if="lastRelease"
            :to="localePath('/releases')"
            class="hidden px-3 font-medium text-gray-400 transition-colors duration-200 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 lg:block"
            exact-active-class="text-primary-500 dark:text-primary-400"
            >{{ lastRelease }}</NuxtLink
          >
          <LangSwitcher class="p-1.5" />
          <ColorSwitcher class="p-1.5" />
          <SocialIcons padding="p-1.5" />
        </div>
      </div>
    </div>
  </header>
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
      return this.$docus.settings
    },
    lastRelease() {
      return this.$docus.lastRelease
    }
  }
}
</script>
