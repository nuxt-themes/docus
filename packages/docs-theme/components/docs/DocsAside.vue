<script setup lang="ts">
import { useCurrentNavigation } from '#imports'

const { tree } = useCurrentNavigation()
</script>

<template>
  <nav>
    <DocsAsideTree v-if="tree?.length > 0" :links="tree" />
    <NuxtLink v-else to="/" class="u-text-gray-500 hover:u-text-gray-700 flex cursor-pointer items-center text-lg">
      <Icon name="heroicons-outline:arrow-left" class="h-6 w-6" />
      <span class="ml-2">Go back</span>
    </NuxtLink>
  </nav>
</template>
