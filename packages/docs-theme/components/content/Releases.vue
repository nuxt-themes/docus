<script setup lang="ts">
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()

if (!config?.github) {
  throw new Error('If you want to use `Releases` component, you must specify: `owner`, `repo` and `branch` in your nuxt.config `github` key.')
}

const formatDateByLocale = (date: string) => {
  const currentLocale = 'en-US'

  try {
    return new Intl.DateTimeFormat(currentLocale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(Date.parse(date))
  } catch (_) {
    return date
  }
}
</script>

<template>
  <GithubReleases v-slot="{ releases }">
    <div v-for="release of releases" :key="release.name" class="release mb-6 flex flex-col-reverse border-gray-100 pb-6 dark:border-gray-800 lg:flex-row lg:border-b">
      <!-- Body -->
      <div class="flex-1">
        <ContentRenderer :value="release" class="docus-content" />
        <ReleasesReactions class="lg:mb-4" :release="release" />
      </div>

      <!-- Header -->
      <div
        class="release-meta z-1 sticky -mt-8 flex w-full flex-row items-center justify-between gap-2 self-start pt-8 text-right lg:w-1/4 lg:flex-col lg:items-end lg:bg-transparent lg:backdrop-blur-none"
      >
        <a :href="release.url" target="_blank">
          <h2 :id="release.name" class="hover:text-primary-500 u-text-gray-900 cursor-pointer text-2xl font-bold lg:text-3xl">
            {{ release.name }}
          </h2>
        </a>

        <div class="flex flex-col gap-2 pb-4">
          <a v-if="release.author" target="_blank" :href="release.author.url" class="hover:u-text-gray-900 flex items-center justify-end gap-2">
            <div class="flex-shrink-0">
              <img class="h-6 w-6 rounded-full" :src="release.author?.avatar" alt="" />
            </div>
            <p class="text-sm lg:text-base">@{{ release.author.name }}</p>
          </a>

          <p class="text-xs lg:text-base">{{ formatDateByLocale(release.date) }}</p>
        </div>
      </div>
    </div>
  </GithubReleases>
</template>

<style lang="postcss" scoped>
.release {
  &:last-of-type {
    @apply mb-0 border-none;
  }
}

.release-meta {
  @apply top-header;

  &:before {
    content: ' ';
    width: 100%;
    right: 0;
    @apply absolute top-0 z-[-1] block h-full bg-white/95 backdrop-blur dark:bg-gray-900/95;
  }
}

@screen lg {
  .release-meta {
    &:before {
      display: none;
    }
  }
}

@screen lg {
  .release-meta {
    @apply flex-col;

    &:before {
      display: none;
    }
  }
}
</style>
