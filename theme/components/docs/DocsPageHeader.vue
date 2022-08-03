<script setup lang="ts">
import { useContent } from '#imports'

defineProps({
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  icon: {
    type: String,
    required: false,
  },
})

const { page } = useContent()
</script>

<template>
  <header>
    <div>
      <div class="flex items-center">
        <h1 class="u-text-gray-900 inline-block text-2xl font-extrabold tracking-tight sm:text-3xl">
          {{ page.title }}
        </h1>
      </div>
    </div>

    <p class="u-text-gray-500 mt-2 text-lg">
      {{ page.description }}
    </p>

    <hr class="u-border-gray-100 my-8" />
  </header>
</template>
