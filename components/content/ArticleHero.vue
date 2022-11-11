<script setup lang="ts">
const { page } = useContent()

const formatDateByLocale = (locale: any, d: any) => {
  return new Date(d).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <div v-if="page" class="py-8 lg:py-16">
    <div class="flex flex-col items-center justify-center max-w-4xl px-4 mx-auto text-center gap-y-8 sm:px-6 lg:px-8">
      <div v-if="page?.date" class="font-semibold text-gray-400">
        <time>{{ formatDateByLocale('en', page.date) }}</time> - {{ page.category }}
      </div>
      <h1 v-if="page?.title" class="text-5xl font-bold text-gray-900 dark:text-white">
        {{ page.title }}
      </h1>
      <p v-if="page?.description" class="max-w-5xl font-medium text-gray-700 dark:text-gray-200">
        {{ page.description }}
      </p>
      <ul v-if="page?.authors?.length" class="flex flex-wrap items-center justify-center gap-4">
        <li v-for="author in page.authors" :key="author.name" class="group">
          <a :href="author.link" alt="twitter account" class="flex p-2 transition-colors duration-300 rounded-md gap-x-2 group-hover:bg-gray-100 dark:group-hover:bg-gray-700">
            <div class="w-12 h-12 rounded-full">
              <img :src="author.avatarUrl" :alt="author.name" class="border-2 border-gray-500 rounded-full">
            </div>
            <div class="flex flex-col items-start justify-center">
              <span class="text-gray-900 dark:text-white">{{ author.name }}</span>
              <span class="text-sm text-gray-400">{{ `@${author.link.split('/').pop()}` }}</span>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
