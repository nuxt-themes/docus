<script setup lang="ts">
const props = defineProps({
  source: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <ProseP>
    <GithubLink v-slot="data" :source="source" :edit="false">
      <NuxtLink :href="data?.url" target="_blank" rel="noopener" class="hover:text-primary-500 flex items-center gap-1 font-semibold text-sm">
        <Icon name="fa-brands:github" class="h-5 w-5 mr-1" />
        <span>Show Source</span>
      </NuxtLink>
    </GithubLink>
  </ProseP>
</template>
