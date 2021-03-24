<template>
  <div>
    <section class="mb-6" :class="{ 'border-b border-gray-200 dark:border-gray-800 pb-6': page.description }">
      <div class="flex items-center justify-between">
        <DComponent v-if="page.icon" :component="page.icon" class="inline-flex mr-3 w-16 h-16 justify-center items-center">
          <span class="text-3rem">{{ page.icon }}</span>
        </DComponent>
        <h1 class="flex-1 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">{{ page.title }}</h1>
        <span v-if="page.draft" class="inline-block px-3 py-1 mr-2 text-base font-medium leading-5 tracking-tight text-yellow-500 bg-yellow-100 rounded-full items-flex dark:bg-yellow-800 dark:text-yellow-400">Draft</span>
        <DBadge v-if="page.badge" class="font-medium">{{ page.badge }}</DBadge>
      </div>
      <p v-if="page.description" class="mt-4 text-lg text-gray-600 dark:text-gray-300">{{ page.description }}</p>
    </section>
    <NuxtContent :document="page" />
    <PageBottom :page="page" />
  </div>
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
