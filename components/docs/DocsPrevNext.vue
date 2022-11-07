<script setup lang="ts">
import { upperFirst } from 'scule'

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
  <div v-if="prev || next" class="flex flex-col-reverse justify-between gap-3 sm:flex-row sm:items-center">
    <NuxtLink
      v-if="prev"
      :to="prev._path"
      class="relative min-w-0 p-3 border rounded-lg hover:border-primary-500 dark:hover:border-primary-500 hover:text-primary-500 u-border-gray-100"
    >
      <p class="h-4 mb-1 text-xs font-medium text-right truncate u-text-gray-500">
        {{ directory(prev._path) }}
      </p>

      <p class="flex items-center gap-3">
        <Icon name="heroicons-outline:arrow-sm-left" class="flex-shrink-0 w-5 h-5" />
        <span class="flex-1 font-medium leading-5 text-right truncate">{{ prev.title }}</span>
      </p>
    </NuxtLink>
    <span v-else />

    <NuxtLink
      v-if="next"
      :to="next._path"
      class="relative min-w-0 p-3 border rounded-lg hover:border-primary-500 dark:hover:border-primary-500 hover:text-primary-500 u-border-gray-100"
    >
      <p class="h-4 mb-1 text-xs font-medium truncate u-text-gray-500">
        {{ directory(next._path) }}
      </p>

      <p class="flex items-center gap-3">
        <span class="flex-1 font-medium leading-5 truncate">{{ next.title }}</span>
        <Icon name="heroicons-outline:arrow-sm-right" class="flex-shrink-0 w-5 h-5" />
      </p>
    </NuxtLink>
  </div>
</template>
