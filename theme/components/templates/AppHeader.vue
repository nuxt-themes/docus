<template>
  <div class="sticky top-0 z-40 flex flex-none w-full mx-auto lg:z-50 max-w-8xl app-header" @click="scrollToTop">
    <div class="flex items-center flex-none pl-4 border-b border-gray-200 sm:pl-6 xl:pl-8 dark:border-gray-800 lg:border-b-0 lg:w-60 xl:w-72">
      <NuxtLink
        :to="localePath('/')"
        class="w-auto overflow-hidden"
        :aria-label="settings.title"
      >
        <span v-if="logo" class="sr-only">{{ settings.title }}</span>
        <span v-if="!logo" class="text-2xl font-bold text-gray-900 dark:text-gray-100">{{ settings.title }}</span>

        <img
          v-if="logo"
          :src="logo.light"
          class="w-auto h-8 light-img"
          :alt="settings.title"
        />
        <img v-if="logo" :src="logo.dark" class="w-auto h-8 dark-img" :alt="settings.title" />
      </NuxtLink>
    </div>
    <div class="flex items-center justify-between flex-auto px-4 space-x-6 border-b border-gray-200 dark:border-gray-800 h-18 sm:px-6 lg:mx-6 lg:px-0 xl:mx-8">
      <AlgoliaSearchBox v-if="settings.algolia" :options="settings.algolia" :settings="settings" class="hidden lg:block" />

      <span class="block" />

      <div class="flex items-center space-x-4">
        <NuxtLink
          v-if="lastRelease"
          :to="localePath('/releases')"
          class="hidden font-medium text-gray-400 transition-colors duration-200 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 lg:block"
          exact-active-class="text-primary-500 dark:text-primary-400"
        >{{ lastRelease.name }}</NuxtLink>

        <LangSwitcher
          :class="{
            'hidden lg:flex': settings.layout !== 'readme'
          }"
        />

        <ColorSwitcher
          :class="{
            'hidden lg:flex': settings.layout !== 'readme'
          }"
        />

        <a
          v-if="settings.twitter"
          :href="`https://twitter.com/${settings.twitter}`"
          target="_blank"
          rel="noopener noreferrer"
          title="Twitter"
          name="Twitter"
          class="text-gray-400 transition-colors duration-200 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
          :class="{
            'hidden lg:block': settings.layout !== 'readme'
          }"
        >
          <IconTwitter class="w-5 h-5" />
        </a>

        <a
          v-if="settings.github.repo"
          :href="$docus.repoUrl"
          target="_blank"
          rel="noopener noreferrer"
          title="Github"
          name="Github"
          class="text-gray-400 transition-colors duration-200 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
          :class="{
            'hidden lg:block': settings.layout !== 'readme'
          }"
        >
          <IconGithub class="w-5 h-5" />
        </a>

        <button
          v-if="settings.layout !== 'readme'"
          class="text-gray-400 transition-colors duration-200 lg:hidden focus:outline-none dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
          aria-label="Menu"
          @click.stop="menu = !menu"
        >
          <IconX v-if="menu" class="w-6 h-6" />
          <IconMenu v-else class="w-6 h-6" />
        </button>
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
    },
    logo () {
      if (!this.settings.logo) {
        return
      }

      if (typeof this.settings.logo === 'object') {
        return this.settings.logo
      }

      return {
        light: this.settings.logo,
        dark: this.settings.logo
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
  background-color: hsla(0,0%,100%,.75);
}

.dark {
  & .app-header {
    background-color: rgba(17, 24, 39, 0.75);
  }
}
</style>
