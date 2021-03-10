<template>
  <aside
    class="fixed top-0 left-0 w-auto h-screen overflow-auto pointer-events-auto lg:sticky lg:top-18 lg:w-60"
  >
    <div
      class="w-auto overflow-auto bg-white dark:bg-gray-900 lg:bg-transparent"
    >
      <div class="flex items-center w-full px-4 lg:hidden h-18 bg-gray-50 dark:bg-gray-800">
        <button class="flex-1 focus:outline-none" @click.stop="menu = !menu">
          <IconArrowLeft class="w-5 h-5" />
        </button>
        <div
          class="flex items-center justify-end w-full px-2 space-x-3 h-18 lg:hidden"
        >
          <ColorSwitcher />
          <SocialIcons />
        </div>
      </div>
      <nav
      :class="[heightClass]"
        class="max-w-sm py-4 pr-24 ml-4 overflow-y-auto text-base font-medium lg:pr-0 lg:text-sm lg:pt-10 lg:pb-16"
      >
        <AsideTop />
        <ul>
          <CategoryItem
            v-for="(docs, category) in categories"
            :key="category"
            :category="category"
            :docs="docs"
          />
        </ul>
        <AsideBottom />
      </nav>
    </div>
  </aside>
</template>

<script>

// function detectMobileSafari() {
//   const ua = window.navigator.userAgent
//   const isMobile = /iPhone|iPad|iPod/i.test(ua)
//   const isSafari = !/Chrome/i.test(ua) && /Safari/i.test(ua)
//   return isMobile && isSafari 
// }

export default {
  computed: {
    heightClass() {
      return 'h-(screen-18)'
      // return process.browser && detectMobileSafari() ? 'h-(screen-46)' : 'h-(screen-18)'
    },  
    categories () {
      return this.$docus.categories[this.$i18n.locale]
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
  }
}
</script>
