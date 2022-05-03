<script setup lang="ts">
const { data: releases } = await useAsyncData<any>('releases', () => githubReleases())

const formatDateByLocale = (locale, d) => {
  const currentLocale = locale || 'en-US'
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(d).toLocaleDateString(currentLocale, options)
}
</script>

<template>
  <ul>
    <div
      v-for="release of releases"
      :key="release.name"
    >
      <div class="relative lg:flex py-8 lg:py-16 lg:border-b lg:dark:border-sky-darker">
        <div class="self-start w-full lg:w-1/4 lg:sticky lg:top-0 lg:pt-38 lg:-mt-32 lg:mb-6">
          <ProseH2 class="mb-3 text-3xl font-light text-tw-gray-900">
            {{ release.name }}
          </ProseH2>

          <p class="text-xs font-semibold uppercase text-tw-gray-400">
            Released on <time :datetime="release.date">{{ formatDateByLocale('en', release.date) }}</time>
          </p>
        </div>

        <Content :document="release" class="lg:w-3/4 px-8 lg:px-0 pt-4 lg:pt-0" />
      </div>
    </div>
  </ul>
</template>

