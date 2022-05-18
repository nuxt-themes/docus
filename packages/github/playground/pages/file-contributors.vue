<script setup lang="ts">
const file = ref('package.json')
</script>

<template>
  <div>
    <GithubFileContributors v-slot="{ contributors, refresh }" :source="file">
      <input v-model="file" style="margin-bottom: 2rem" type="text" @input="refresh" />

      <div v-for="contributor in contributors" :key="contributor.login">
        <div :id="contributor.login">
          <img style="height: 32px; width: 32px" :src="contributor.avatar_url" />
          {{ contributor.login }}
        </div>
      </div>
    </GithubFileContributors>
  </div>
</template>
