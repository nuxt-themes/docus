<template>
  <AppContainer aside>
    <template #aside>
      <!-- todo: navigation instead -->
      <AppAside class="block lg:hidden" />
    </template>
    <AppPage>
      <PageContent v-if="page.slug || page.summary === false" :page="page" />
      <div v-else>
        <section class="mb-6" :class="{ 'border-b border-gray-200 dark:border-gray-800 pb-6': page.description }">
          <div class="flex items-center justify-between">
            <DComponent
              v-if="page.icon"
              :component="page.icon"
              class="inline-flex mr-3 w-16 h-16 justify-center items-center"
            >
              <span class="text-3rem">{{ page.icon }}</span>
            </DComponent>
            <h1 class="flex-1 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">{{ page.title }}</h1>
            <span
              v-if="page.draft"
              class="inline-block px-3 py-1 mr-2 text-base font-medium leading-5 tracking-tight text-yellow-500 bg-yellow-100 rounded-full items-flex dark:bg-yellow-800 dark:text-yellow-400"
              >Draft</span
            >
            <DBadge v-if="page.badge" class="font-medium">{{ page.badge }}</DBadge>
          </div>
          <p v-if="page.description" class="mt-4 text-lg text-gray-600 dark:text-gray-300">{{ page.description }}</p>
        </section>
        <!-- PagesSummary -->
        <!-- PageSummary -->
        <section class="pb-10">
          <ul
            class="grid gap-4 font-semibold text-left text-gray-900 dark:text-gray-100 sm:grid-cols-2 xl:grid-cols-3 2xl:gap-8"
          >
            <li v-for="link of $docus.nav.en.links[2].children" :key="link.to" class="flex">
              <NuxtLink
                :to="link.to"
                class="relative w-full px-6 py-8 bg-gray-50 dark:bg-gray-800 rounded shadow dark:bg-gray-900 hover:shadow-lg"
              >
                <DComponent
                  v-if="link.icon"
                  :component="link.icon"
                  class="w-16 h-16 mb-3"
                  :class="link.iconClass || ''"
                >
                  <span class="inline-block w-16 h-16 mb-3 text-6xl">{{ link.icon }}</span>
                </DComponent>
                <h2 class="mb-2 text-xl">{{ link.title }}</h2>
                <p class="font-normal">{{ link.description }}</p>
              </NuxtLink>
            </li>
          </ul>
        </section>
      </div>
      <template #toc>
        <PageToc v-if="page.toc" :title="page.tocTitle" :toc="page.toc" />
      </template>
    </AppPage>
  </AppContainer>
</template>

<script>
export default {
  props: {
    page: {
      type: Object,
      required: true
    }
  }
}
</script>
