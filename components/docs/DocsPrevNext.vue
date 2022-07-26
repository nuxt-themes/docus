<script setup lang="ts">
import { upperFirst } from 'scule'
import { useContent, useContentHelpers } from '#imports'

const { prev, next, navigation } = useContent()
const { navDirFromPath } = useContentHelpers()

const directory = (link) => {
  const nav = navDirFromPath(link._path, navigation.value || [])

  if (nav && nav[0]) {
    return nav[0]._path
  } else {
    const dirs = link.split('/')
    const directory = dirs.length > 1 ? dirs[dirs.length - 2] : ''
    return directory.split('-').map(upperFirst).join(' ')
  }
}
</script>

<template>
  <div v-if="prev || next" class="flex items-center justify-between gap-3">
    <NuxtLink
      v-if="prev"
      :to="prev._path"
      class="hover:border-primary-500 dark:hover:border-primary-500 hover:text-primary-500 u-border-gray-100 relative min-w-0 rounded-lg border p-3"
    >
      <p v-if="directory(prev._path)" class="u-text-gray-500 mb-1 text-right text-xs font-medium">{{ directory(prev._path) }}</p>

      <p class="flex items-center gap-3">
        <Icon name="heroicons-outline:arrow-sm-left" class="h-5 w-5 flex-shrink-0" />
        <span class="truncate text-right font-medium leading-5">{{ prev.title }}</span>
      </p>
    </NuxtLink>
    <span v-else />

    <NuxtLink
      v-if="next"
      :to="next._path"
      class="hover:border-primary-500 dark:hover:border-primary-500 hover:text-primary-500 u-border-gray-100 relative min-w-0 rounded-lg border p-3"
    >
      <p v-if="directory(next._path)" class="u-text-gray-500 mb-1 text-xs font-medium">{{ directory(next._path) }}</p>

      <p class="flex items-center gap-3">
        <span class="truncate font-medium leading-5">{{ next.title }}</span>
        <Icon name="heroicons-outline:arrow-sm-right" class="h-5 w-5 flex-shrink-0" />
      </p>
    </NuxtLink>
  </div>
</template>
