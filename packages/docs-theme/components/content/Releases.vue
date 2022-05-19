<script setup lang="ts">
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
  <GithubReleases v-slot="{ releases }">
    <div v-for="release of releases" :key="release.name" class="flex flex-col-reverse pb-6 mb-6 border-gray-100 release dark:border-gray-800 lg:border-b lg:flex-row">
      <!-- Body -->
      <div class="flex-1">
        <ContentRenderer :value="release" class="docus-content" />
        <ReleasesReactions class="lg:mb-4" :release="release" />
      </div>

      <!-- Header -->
      <div
        class="sticky flex flex-row items-center self-start justify-between w-full gap-2 py-2 text-right lg:py-0 release-meta surface z-1 lg:w-1/4 lg:bg-transparent lg:backdrop-blur-none lg:items-end lg:flex-col"
      >
        <a :href="release.url" target="_blank">
          <h2 :id="release.name" class="text-2xl font-bold transition-colors cursor-pointer hover:text-secondary-hover transition-base lg:text-3xl">
            {{ release.name }}
          </h2>
        </a>

        <div class="flex flex-col gap-2 pb-4">
          <a
            v-if="release.author"
            target="_blank"
            :href="release.author.url"
            class="flex items-center justify-end gap-2 transition-colors hover:text-secondary-hover transition-base"
          >
            <div class="flex-shrink-0">
              <img class="w-6 h-6 rounded-full" :src="release.author?.avatar" alt="" />
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
    @apply border-none mb-0;
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
