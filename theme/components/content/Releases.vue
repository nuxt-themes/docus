<script setup lang="ts">
const { data: releases } = await useAsyncData('releases', () => githubReleases())

const formatDateByLocale = (locale, d) => {
  const currentLocale = locale || 'en-US'
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(d).toLocaleDateString(currentLocale, options)
}
</script>

<template>
  <div>
    <div v-for="release in releases" :key="release.name">
      <ProseH2 :id="release.name">
        {{ release.name }}
      </ProseH2>
      <p class="text-xs font-semibold uppercase text-tw-gray-400">
        Released on
        <time :datetime="release.date">{{ formatDateByLocale('en', release.date) }}</time>
      </p>
      <Content :document="release" />
    </div>
  </div>
</template>
