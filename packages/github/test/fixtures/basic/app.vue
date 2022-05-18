<script setup>
import { useGithub } from '#imports'

const { data: releases } = await useAsyncData('releases', () => useGithub().fetchReleases())
</script>

<template>
  <div>
    <div v-for="release in releases" :key="release.name">
      <ProseH2 :id="release.name">
        {{ release.name }}
      </ProseH2>
      <Content :document="release" />
    </div>
  </div>
</template>
