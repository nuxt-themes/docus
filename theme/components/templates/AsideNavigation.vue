<template>
  <aside
    class="fixed top-0 left-0 w-auto h-screen overflow-auto pointer-events-auto lg:sticky lg:top-18 lg:w-60 xl:w-72"
  >
    <div
      class="w-auto overflow-auto bg-white dark:bg-gray-900 lg:bg-transparent"
    >
      <div class="flex items-center w-full px-4 lg:hidden h-18 ">
        <button class="p-4 focus:outline-none" @click.stop="menu = !menu">
          <IconX class="w-6 h-6" />
        </button>
      </div>
      <nav
        class="pb-10 pl-4 pr-12 ml-4 overflow-y-auto text-base font-medium h-(screen-36) lg:h-(screen-18) xl:px-6 lg:text-sm lg:pt-10 lg:pb-16"
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
      <div
        class="flex items-center justify-center w-full space-x-2 h-18 lg:hidden md:space-x-4"
      >
        <ColorSwitcher />
        <SocialIcons />
      </div>
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
