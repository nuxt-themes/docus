<script setup lang="ts">
import { githubReleases } from '#imports'

const releases = await githubReleases()

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
  <Container class="relative flex flex-col lg:py-4 lg:gap-4 lg:px-6">
    <div v-for="release of releases" :key="release.name" class="release surface-border flex flex-col-reverse lg:border-b lg:flex-row lg:pb-0">
      <!-- Body -->
      <div class="flex-1 p-4 sm:p-6 lg:p-0">
        <Document :model-value="release" class="docus-content" />

        <ReleasesReactions class="lg:mb-4" :release="release" />
      </div>

      <!-- Header -->
      <div
        class="py-2 lg:py-4 lg:py-0 release-meta surface z-1 sticky lg:w-1/4 lg:bg-transparent lg:backdrop-blur-none flex flex-row items-center justify-between lg:items-end w-full lg:flex-col justify-end gap-2 self-start text-right px-4 sm:px-6 lg:px-0"
      >
        <a :href="release.url" target="_blank">
          <h2 :id="release.name" class="hover:text-secondary-hover transition-base cursor-pointer text-2xl font-bold transition-colors lg:text-3xl">
            {{ release.name }}
          </h2>
        </a>

        <div class="flex flex-col gap-2 pb-4">
          <a
            v-if="release.author"
            target="_blank"
            :href="release.author.url"
            class="hover:text-secondary-hover transition-base flex items-center justify-end gap-2 transition-colors"
          >
            <div class="flex-shrink-0">
              <img class="h-6 w-6 rounded-full" :src="release.author?.avatar" alt="" />
            </div>
            <p class="text-sm lg:text-base">@{{ release.author.name }}</p>
          </a>

          <p class="text-xs lg:text-base">{{ formatDateByLocale(release.date) }}</p>
        </div>
      </div>
    </div>
  </Container>
</template>

<style lang="postcss" scoped>
.release {
  &:last-of-type {
    @apply border-none;
  }
}

.release-meta {
  @apply top-header;

  &:before {
    content: ' ';
    width: 100%;
    right: 0;
    @apply block absolute z-[-1] top-0 surface surface-blurry h-full;
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
