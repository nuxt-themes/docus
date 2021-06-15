<template>
  <NuxtLink tag="article" :to="slug" class="cursor-pointer shadow rounded-lg overflow-hidden">
    <div class="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-800 mb-4">
      <NuxtImg :src="image" width="864" height="378" :alt="title" />
    </div>
    <h1 class="font-bold text-body-xl mb-2 px-4">{{ title }}</h1>
    <p class="pb-8 px-4">{{ description }}</p>
    <slot name="footer" />
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
    }
  }
})
</script>
