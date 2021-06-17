<template>
  <article class="flex flex-col shadow rounded-lg overflow-hidden dark:bg-secondary-darkest">
    <div class="aspect-h-9 bg-gray-100 dark:bg-secondary-darker mb-4">
      <NuxtLink :to="`/blog/${slug}`">
        <NuxtImg :src="image" width="864" height="378" :alt="title" />
      </NuxtLink>
    </div>
    <div v-if="tags.length" class="px-4 mb-1">
      <span v-for="(tag, i) in tags" :key="tag" class="text-gray-400 dark:text-cloud font-medium text-sm">
        <span>{{ tag }}</span>
        <span v-if="(i === 0 && tags.length > 1) || i !== tags.length - 1"> – </span>
      </span>
    </div>
    <div v-else-if="category" class="px-4 mb-1">
      <span class="text-gray-400 dark:text-cloud font-medium text-sm">{{ category }}</span>
    </div>
    <h1 class="font-bold text-body-xl mb-2 px-4">
      <NuxtLink :to="`/blog/${slug}`">{{ title }}</NuxtLink>
    </h1>
    <p class="pb-8 px-4 text-gray-500 dark:text-cloud-lighter">{{ description }}</p>
    <slot name="footer" />
  </article>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    slug: {
      type: String,
      default: ''
    },
    tags: {
      type: Array,
      default: () => []
    },
    category: {
      type: String,
      default: ''
    }
  }
})
</script>
