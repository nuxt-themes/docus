<template>
  <div class="py-4 d-container-content">
    <div class="flex flex-col light:text-secondary-dark dark:text-white py-8">
      <h2 class="font-semibold text-xl">
        <Markdown slot="title" unwrap="p" />
      </h2>
      <hr class="mt-2 mb-4" />
      <Markdown slot="description" class="text-lg" />
      <Component :is="sectionComponent" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    sectionComponent: {
      type: String,
      default: null
    }
  }
})
</script>
