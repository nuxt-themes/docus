<template>
  <aside class="fixed top-0 left-0 z-10 h-full pointer-events-auto lg:static lg:w-60 xl:w-72">
    <div
      class="h-screen pl-4 pr-12 overflow-auto bg-white dark:bg-gray-900 lg:sticky lg:bg-transparent lg:top-18"
    >
      <nav
        class="pt-6 overflow-y-auto font-medium text-base sm:px-4 xl:px-6 lg:text-sm pb-10 lg:pt-10 lg:pb-16 lg:h-(screen-18)"
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
    }
  }
};
</script>
