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
        class="py-4 pr-24 lg:pr-0 ml-4 max-w-sm overflow-y-auto text-base font-medium h-(screen-18) lg:h-(screen-18) lg:text-sm lg:pt-10 lg:pb-16"
      >
        <AsideTop />
        <ul v-if="lastRelease" class="mb-8 space-y-8 lg:hidden">
          <li v-if="lastRelease">
            <NuxtLink
              to="/releases"
              class="px-4 py-2 font-medium text-gray-400 transition duration-200 lg:px-3 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
              exact-active-class="text-primary-500 dark:text-primary-400"
              >{{ lastRelease.name }}</NuxtLink
            >
          </li>
        </ul>

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
export default {
  computed: {
    categories() {
      return this.$docus.categories[this.$i18n.locale];
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
  }
};
</script>
