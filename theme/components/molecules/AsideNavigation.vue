<template>
  <div
    class="fixed top-0 left-0 w-auto min-w-60 h-full overflow-auto pointer-events-auto lg:h-screen min-h-fill-available lg:sticky lg:top-18 lg:w-60"
  >
    <div
      class="w-auto h-full overflow-auto bg-white dark:bg-gray-900 lg:bg-transparent"
    >
      <!-- aside header -->
      <div
        class="flex items-center w-full px-4 sm:px-6 lg:hidden h-18 bg-gray-50 dark:bg-gray-800"
      >
        <button class="flex-1 text-gray-500 transition-colors duration-200 focus:outline-none lg:hidden dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-400" @click.stop="menu = !menu">
          <IconArrowLeft class="w-5 h-5" />
        </button>
        <div
          class="flex items-center justify-end w-full px-2 space-x-3 h-18 lg:hidden"
        >
          <DLangSwitcher />
          <DColorSwitcher />
          <SocialIcons />
        </div>
      </div>

      <!-- aside navigation -->
      <nav
        class="flex flex-col justify-between lg:justify-start max-w-sm overflow-y-auto text-base font-medium h-(full-18) lg:text-sm"
      >
        <div class="py-4 pl-4 pr-24 sm:pl-6 lg:pr-0 lg:pt-10 ">
          <AsideTop />
          <ul>
            <AsideNavigationItem
              v-for="(docs, category) in categories"
              :key="category"
              :category="category"
              :docs="docs"
            />
          </ul>
          <AsideBottom />
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
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
