<template>
  <div class="overflow-hidden mt-12 mb-6">
    <div class="relative d-container-content">
      <h1 class="text-display-4 font-serif mb-4">{{ title }}</h1>
      <p class="text-body-lg max-w-3xl">{{ description }}</p>
    </div>
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
