<script setup lang="ts">
const { page } = useContent()
</script>

<template>
  <header>
    <div>
      <div class="flex items-center">
        <h1 class="inline-block text-2xl font-extrabold tracking-tight u-text-gray-900 sm:text-3xl">
          {{ page.title || 'Default title' }}
        </h1>
      </div>
    </div>

    <p class="mt-2 text-lg u-text-gray-500">
      {{ page.description || 'Default description' }}
    </p>

    <hr class="my-8 u-border-gray-100">
  </header>
</template>
