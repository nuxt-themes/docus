<script setup lang="ts">
const file = ref('package.json')
</script>

<template>
  <GithubFileContributors v-slot="{ contributors, refresh }" :source="file">
    <input v-model="file" disabled class="mb-4 rounded-lg p-2" type="text" @input="refresh" />

    <div v-if="contributors" class="flex flex-col gap-2">
      <Contributor v-for="contributor of contributors" :key="contributor.login" :contributor="contributor" />
    </div>
  </GithubFileContributors>
</template>
