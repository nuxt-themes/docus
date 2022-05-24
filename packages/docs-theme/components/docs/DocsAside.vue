<script setup lang="ts">
import { useCurrentNavigation } from '#imports'

const { tree } = useCurrentNavigation()
</script>

<template>
  <nav>
    <DocsAsideTree v-if="tree?.length > 0" :links="tree" />
    <NuxtLink v-else to="/" class="flex items-center text-lg cursor-pointer text-secondary hover:text-secondary-hover">
      <Icon name="heroicons-outline:arrow-left" class="w-6 h-6" />
      <span class="ml-2">Go back</span>
    </NuxtLink>
  </nav>
</template>
