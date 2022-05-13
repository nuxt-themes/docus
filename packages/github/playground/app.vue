<script setup>
const { data: releases } = await useAsyncData('releases', () => githubReleases())

const { data: lastRelease } = await useAsyncData('releases', () =>
  githubReleases({
    repo: 'nuxt/framework',
    per_page: 1,
    page: 1,
  }),
)
</script>

<template>
  <div>
    <div v-for="release in releases" :key="release.name">
      <ProseH2 :id="release.name">
        {{ release.name }}
      </ProseH2>

      <Content :document="release" />

      <p>Version: {{ release.v }}</p>

      <p>URL: {{ release.url }}</p>

      <p>Zipball: {{ release.zipall }}</p>

      <p>Tarball: {{ release.tarball }}</p>

      <p>Is prerelease ?: {{ release.prerelease }}</p>

      <p>Reactions: {{ release.reactions }}</p>

      <p>Author: {{ release.author }}</p>
    </div>

    <pre v-if="lastRelease">
      {{ JSON.stringify(lastRelease, null, 2) }}
    </pre>
  </div>
</template>
