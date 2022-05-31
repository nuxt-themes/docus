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
    <NuxtLink v-if="prev" :to="prev._path" class="group relative flex flex-col items-start truncate">
      <span class="relative flex flex-col items-end truncate">
        <span class="mb-1 text-xs font-bold leading-tight tracking-tight">{{ directory(prev._path) || '&nbsp;' }}</span>

        <span class="group-hover:text-primary-500 flex w-full items-center leading-tight">
          <Icon name="heroicons-outline:arrow-sm-left" class="mr-2 h-4 w-4 flex-shrink-0" />
          <span class="truncate">{{ prev.title }}</span>
        </span>
      </span>
    </NuxtLink>
    <span v-else />

    <NuxtLink v-if="next" :to="next._path" class="group relative flex flex-col items-start truncate">
      <span v-if="directory(next._path)" class="mb-1 text-xs font-bold leading-tight tracking-tight">{{ directory(next._path) }}</span>

      <span class="group-hover:text-primary-500 flex w-full items-center leading-tight">
        <span class="truncate">{{ next.title }}</span>
        <Icon name="heroicons-outline:arrow-sm-right" class="ml-2 h-4 w-4 flex-shrink-0" />
      </span>
    </NuxtLink>
  </div>
</template>
