<script setup lang="ts">
import { upperFirst } from 'scule'
import { useDocus, useDocusHelpers } from '#imports'

const { prev, next, navigation } = useDocus()
const { navFromPath } = useDocusHelpers()

const directory = (link) => {
  const nav = navFromPath(link._path, navigation.value || [])

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
      class="hover:border-primary-500 dark:hover:border-primary-500 hover:text-primary-500 relative rounded-lg border border-gray-100 p-3 dark:border-gray-800"
    >
      <p v-if="directory(prev._path)" class="mb-1 text-right text-xs font-medium text-gray-400">{{ directory(prev._path) }}</p>

      <p class="flex items-center gap-3">
        <Icon name="heroicons-outline:arrow-sm-left" class="h-5 w-5 flex-shrink-0" />
        <span class="text-right font-medium leading-5">{{ prev.title }}</span>
      </p>
    </NuxtLink>
    <span v-else />

    <NuxtLink
      v-if="next"
      :to="next._path"
      class="hover:border-primary-500 dark:hover:border-primary-500 hover:text-primary-500 relative rounded-lg border border-gray-100 p-3 dark:border-gray-800"
    >
      <p v-if="directory(next._path)" class="mb-1 text-xs font-medium text-gray-400">{{ directory(next._path) }}</p>

      <p class="flex items-center gap-3">
        <span class="font-medium leading-5">{{ next.title }}</span>
        <Icon name="heroicons-outline:arrow-sm-right" class="h-5 w-5 flex-shrink-0" />
      </p>
    </NuxtLink>
  </div>
</template>
