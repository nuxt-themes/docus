<script setup lang="ts">
const { tree } = useCurrentNavigation()
</script>

<template>
  <nav>
    <DocsAsideTree v-if="tree?.length > 0" :links="tree" />
    <NuxtLink v-else to="/" class="flex items-center text-sm cursor-pointer u-text-gray-500 hover:u-text-gray-700">
      <Icon name="heroicons-outline:arrow-left" class="w-4 h-4" />
      <span class="ml-2">Go back</span>
    </NuxtLink>
  </nav>
</template>
