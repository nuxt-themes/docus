<script setup lang="ts">
const { page } = useContent()
const docus = useDocus()

const root = computed(() => docus.value.github?.root || '/')
</script>
<template>
  <GithubFileContributors
    v-slot="{ contributors, pending }"
    :source="root + page?._file"
  >
    <div class="flex flex-col gap-4">
      <span class="flex items-center inline-block gap-2 text-sm grow-0">
        <Icon name="heroicons-outline:user-group" class="w-5 h-5" />
        <span>Contributors</span>
      </span>
      <div v-if="contributors?.length" class="flex flex-wrap gap-2">
        <NuxtLink
          v-for="contributor in contributors"
          :key="contributor.login"
          :alt="contributor.name"
          :title="`@${contributor.login} on GitHub`"
          :to="`https://github.com/${contributor.login}`"
        >
          <img :src="contributor.avatar_url" class="inline-block w-6 h-6 transition-colors rounded-full u-ring-gray-200 hover:ring-primary-500 ring-2">
        </NuxtLink>
      </div>
      <span v-else-if="pending" class="block w-6 h-6 opacity-0">&nbsp;</span>
      <span v-else-if="!pending && !contributors?.length" class="block u-text-gray-500">No contributors.</span>
    </div>
  </githubfilecontributors>
</template>
