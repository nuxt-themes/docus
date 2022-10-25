<script setup lang="ts">
const { page } = useContent()
const docus = useDocus()

const root = computed(() => docus.value.github?.root || '/')
</script>
<template>
  <GithubLink v-slot="data" :content-dir="root" :page="page">
    <span class="flex">
      <NuxtLink :href="data?.url" target="_blank" rel="noopener" class="flex items-center inline-block gap-2 text-sm hover:text-primary-500 grow-0">
        <Icon name="heroicons-outline:external-link" class="w-5 h-5" />
        <span>Edit this page on GitHub</span>
      </NuxtLink>
    </span>
  </GithubLink>
</template>
