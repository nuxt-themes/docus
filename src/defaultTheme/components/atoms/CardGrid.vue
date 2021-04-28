<template>
  <section class="py-12 lg:py-24 bg-gray-50 dark:bg-gray-800">
    <div class="d-container-content">
      <h2 class="mb-8 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
        {{ title }}
      </h2>
      <div
        class="grid gap-4 font-semibold text-left text-gray-900 dark:text-gray-100 sm:grid-cols-2 xl:grid-cols-3 2xl:gap-8"
      >
        <slot />
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    title: {
      type: String,
      default: 'Features'
    }
  }
})
</script>
