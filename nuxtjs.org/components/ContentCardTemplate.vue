<template>
  <NuxtLink
    :to="`/blog/${slug}`"
    class="flex flex-col cursor-pointer shadow rounded-lg overflow-hidden dark:bg-secondary-darkest"
  >
    <article>
      <div class="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-secondary-darker mb-4">
        <NuxtImg :src="image" width="864" height="378" :alt="title" />
      </div>
      <div v-if="tags.length" class="px-4 mb-1">
        <span v-for="(tag, i) in tags" :key="tag" class="text-gray-400 dark:text-cloud font-medium text-sm">
          <span>{{ tag }}</span>
          <span v-if="(i === 0 && tags.length > 1) || i !== tags.length - 1"> – </span>
        </span>
      </div>
      <h1 class="font-bold text-body-xl mb-2 px-4">
        <NuxtLink :to="`/blog/${slug}`">{{ title }}</NuxtLink>
      </h1>
      <p class="pb-8 px-4 text-gray-500 dark:text-cloud-lighter">{{ description }}</p>
      <slot name="footer" />
    </article>
  </NuxtLink>
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
    }
  }
})
</script>
