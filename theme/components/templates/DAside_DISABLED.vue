<template>
  <div class="lg:flex lg:flex-1">
    <aside
      class="fixed inset-0 z-40 flex-none w-full h-full bg-black bg-opacity-25 lg:bg-white lg:dark:bg-gray-900 lg:static lg:h-auto lg:overflow-y-visible lg:pt-0 lg:w-60 xl:w-72 lg:block"
      :class="{ 'hidden': !$menu.open }"
      @click="$menu.open = false"
    >
      <div class="h-full mr-24 overflow-hidden overflow-y-auto bg-white sm:mr-64 lg:h-auto lg:block lg:sticky lg:bg-transparent lg:top-18 dark:bg-gray-900 lg:mr-0" @click.stop>
        <div class="absolute inset-x-0 z-10 hidden h-12 pointer-events-none lg:block bg-gradient-to-b from-white dark:from-gray-900"></div>

        <nav class="pt-6 overflow-y-auto font-medium text-base sm:px-4 xl:px-6 lg:text-sm pb-10 lg:pt-10 lg:pb-16 lg:h-(screen-18)">
          <DAsideTop />
          <ul v-if="lastRelease" class="mb-8 space-y-8 lg:hidden">
            <li>
              <NuxtLink
                to="/releases"
                class="px-4 py-2 font-medium text-gray-400 transition duration-200 lg:px-3 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
                exact-active-class="text-primary-500 dark:text-primary-400"
              >{{ lastRelease.name }}</NuxtLink>
            </li>
          </ul>

          <ul>
            <DCategoryItem v-for="(docs, category) in categories" :key="category" :category="category" :docs="docs" />
          </ul>
          <DAsideBottom />
        </nav>
      </div>
    </aside>
    <DMenuButton />
  </div>
</template>

<script>
export default {
  computed: {
    settings () {
      return this.$docus.settings
    },
    categories () {
      return this.$docus.categories[this.$i18n.locale]
    },
    lastRelease () {
      return this.$docus.lastRelease
    }
  }
}
</script>
