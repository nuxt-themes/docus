<template>
  <div class="sticky top-0 z-40 lg:z-50 w-full max-w-8xl mx-auto app-header flex-none flex" @click="scrollToTop">
    <div class="flex-none pl-4 sm:pl-6 xl:pl-8 flex items-center border-b border-gray-200 dark:border-gray-800 lg:border-b-0 lg:w-60 xl:w-72">
      <NuxtLink
        :to="localePath('/')"
        class="overflow-hidden w-auto"
        :aria-label="settings.title"
      >
        <span v-if="logo" class="sr-only">{{ settings.title }}</span>
        <span v-if="!logo" class="font-bold text-2xl text-gray-900 dark:text-gray-100">{{ settings.title }}</span>

        <img
          v-if="logo"
          :src="logo.light"
          class="h-8 w-auto light-img"
          :alt="settings.title"
        />
        <img v-if="logo" :src="logo.dark" class="h-8 w-auto dark-img" :alt="settings.title" />
      </NuxtLink>
    </div>
    <div class="flex-auto border-b border-gray-200 dark:border-gray-800 h-18 flex items-center justify-between px-4 sm:px-6 lg:mx-6 lg:px-0 xl:mx-8 space-x-6">
      <AlgoliaSearchBox v-if="settings.algolia" :options="settings.algolia" :settings="settings" class="hidden lg:block" />

      <span class="block" />

      <div class="flex items-center space-x-4">
        <NuxtLink
          v-if="lastRelease"
          :to="localePath('/releases')"
          class="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 transition-colors duration-200 font-medium hidden lg:block"
          exact-active-class="text-primary-500 dark:text-primary-400"
        >{{ lastRelease.name }}</NuxtLink>

        <LangSwitcher
          :class="{
            'hidden lg:flex': settings.layout !== 'single'
          }"
        />

        <ColorSwitcher
          :class="{
            'hidden lg:flex': settings.layout !== 'single'
          }"
        />

        <a
          v-if="settings.twitter"
          :href="`https://twitter.com/${settings.twitter}`"
          target="_blank"
          rel="noopener noreferrer"
          title="Twitter"
          name="Twitter"
          class="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 transition-colors duration-200"
          :class="{
            'hidden lg:block': settings.layout !== 'single'
          }"
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
          :class="{
            'hidden lg:block': settings.layout !== 'single'
          }"
        >
          <IconGithub class="w-5 h-5" />
        </a>

        <button
          v-if="settings.layout !== 'single'"
          class="lg:hidden focus:outline-none text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 transition-colors duration-200"
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

<style>
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
