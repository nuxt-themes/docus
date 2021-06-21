<template>
  <div class="relative pt-24 pb-32 bg-gray-100 dark:bg-secondary-darkest">
    <div class="relative d-container-content">
      <h1 class="text-display-3 font-serif mb-4">{{ title }}</h1>
      <p class="text-body-xl max-w-3xl">{{ description }}</p>
    </div>

    <img
      loading="lazy"
      :src="`/img/page-hero/dark/mountains.svg`"
      class="absolute -bottom-1px left-0 w-full h-24 object-fill light:hidden pointer-events-none"
      alt="A landscape image"
    />
    <img
      loading="lazy"
      :src="`/img/page-hero/light/mountains.svg`"
      class="absolute -bottom-1px left-0 w-full h-24 object-fill dark:hidden pointer-events-none"
      alt="A landscape image"
    />
  </div>
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
    }
  }
})
</script>
