<template>
  <div class="d-header" @click="scrollToTop">
    <div class="flex flex-1 h-18 d-container-content items-center">
      <NavigationButton />
      <div class="flex flex-1 justify-center items-center lg:flex-none">
        <div class="flex flex-none font-semibold text-2xl text-gray-900 items-center dark:text-gray-100">
          <NuxtLink
            :to="localePath('/')"
            class="w-auto overflow-hidden"
            :aria-label="settings.title"
          >
            <HeaderLogo />
          </NuxtLink>
        </div>
      </div>
      <div class="hidden lg:flex lg:flex-1">
        <HeaderNavigation />
      </div>
      <!-- Middle section -->
      <div class="flex items-center justify-end lg:flex-none" @click.stop>
        <AlgoliaSearchBox
          v-if="settings.algolia"
          :options="settings.algolia"
          :settings="settings"
          class="w-14 lg:flex-1 lg:px-1.5"
        />
        <div v-else class="flex lg:hidden">
          <DColorSwitcher />
        </div>

        <!-- Desktop: Right section -->
        <div
          class="space-x-2 items-center justify-end hidden md:space-x-4 lg:flex"
          @click.stop
        >
          <DLangSwitcher />
          <DColorSwitcher />
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
    settings () {
      return this.$docus.settings
    },
    lastRelease () {
      return this.$docus.lastRelease
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
