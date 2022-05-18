<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()

const nav = [
  {
    name: 'Repository',
    path: '/',
  },
  {
    name: 'Releases',
    path: '/releases',
  },
  {
    name: 'Last Release',
    path: '/last-release',
  },
  {
    name: 'Contributors',
    path: '/contributors',
  },
  {
    name: 'File Contributors',
    path: '/file-contributors',
  },
]
</script>

<template>
  <div>
    <h2>@docus/github</h2>
    <span>Repository: {{ `${runtimeConfig.github?.owner}/${runtimeConfig.github?.repo}` }}</span>

    <div style="width: 100%; height: 100px; display: flex; align-items: center">
      <div v-for="item of nav" :key="item.name" style="margin: 0 1rem">
        <NuxtLink :to="item.path">{{ item.name }}</NuxtLink>
      </div>
    </div>
  </div>
</template>
