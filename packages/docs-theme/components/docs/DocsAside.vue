<script setup lang="ts">
import { useCurrentNavigation } from '#imports'

const { tree } = useCurrentNavigation()
</script>

<template>
  <nav>
    <DocsAsideTree v-if="tree?.length > 0" :links="tree" />
    <NuxtLink v-else to="/" class="text-secondary hover:text-secondary-hover flex cursor-pointer items-center text-lg">
      <Icon name="heroicons-outline:arrow-left" class="h-6 w-6" />
      <span class="ml-2">Go back</span>
    </NuxtLink>
  </nav>
</template>
