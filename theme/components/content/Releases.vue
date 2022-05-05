<script setup lang="ts">
import { useDocus } from '#imports'

const { data: releases } = await useAsyncData<any>('releases', () => githubReleases())

const formatDateByLocale = (date: string) => {
  const currentLocale = 'en-US'

  return new Intl.DateTimeFormat(currentLocale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(Date.parse(date))
}
</script>

<template>
  <div class="relative my-4">
    <div v-for="release of [...releases, ...releases, ...releases]" :key="release.name" class="release surface-border relative flex flex-col-reverse border-b lg:flex-row">
      <!-- Body -->
      <Content :document="release" class="docus-content flex-1" />

      <!-- Header -->
      <div class="release-meta surface surface-blurry z-1 sticky flex w-full flex-col justify-end gap-2 self-start px-8 text-right lg:w-1/4 lg:px-0">
        <a :href="release.url" target="_blank">
          <h2 :id="release.name" class="hover:text-secondary-hover transition-base cursor-pointer text-2xl font-bold transition-colors lg:text-3xl">
            {{ release.name }}
          </h2>
        </a>

        <div class="flex flex-col gap-2">
          <a v-if="release.author" target="_blank" :href="release.author.url" class="hover:text-secondary-hover transition-base flex items-center justify-end gap-2 transition-colors">
            <div class="flex-shrink-0">
              <img class="h-6 w-6 rounded-full" :src="release.author?.avatar" alt="" />
            </div>
            <p class="text-sm lg:text-base">@{{ release.author.name }}</p>
          </a>

          <p class="text-xs lg:text-base">{{ formatDateByLocale(release.date) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.release {
  @apply pb-8 lg:mt-8;

  &:first-of-type {
    @apply mt-0;
  }

  &:last-of-type {
    @apply border-none;
  }
}

.release-meta {
  @apply top-header flex-row items-center justify-between pt-4 pb-4 lg:items-end;
}

@screen lg {
  .release-meta {
    @apply flex-col pt-0;
    top: calc(var(--header-height) + theme('spacing.8'));
  }
}
</style>
