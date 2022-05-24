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
  <div v-if="prev || next" class="flex flex-row-reverse items-center justify-between gap-4 font-medium leading-7 group">
    <div class="flex items-center justify-start flex-1 w-full">
      <NuxtLink
        v-if="prev"
        :to="prev._path"
        class="transition-base surface-border hover:surface-border-hover hover:text-secondary-hover group inline-flex w-full items-center justify-start truncate rounded-xl border px-4 py-2.5 transition"
      >
        <span class="relative flex flex-col items-end truncate">
          <span class="mb-1 text-xs leading-tight d-secondary-text">
            {{ directory(prev._path) || '&nbsp;' }}
          </span>

          <span class="flex items-center w-full leading-tight">
            <Icon name="heroicons-outline:chevron-double-left" class="flex-shrink-0 w-4 h-4 mr-2" />
            <span class="truncate">{{ prev.title }}</span>
          </span>
        </span>
      </NuxtLink>
    </div>

    <div class="flex justify-end flex-1 order-first h-full">
      <NuxtLink
        v-if="next"
        :to="next._path"
        class="transition-base surface-border hover:surface-border-hover hover:text-secondary-hover group inline-flex w-full h-full items-center justify-end truncate rounded-xl border px-4 py-2.5 transition"
      >
        <span class="relative flex flex-col items-start truncate">
          <span class="mb-1 text-xs leading-tight d-secondary-text"> {{ directory(next._path) || '&nbsp;' }} </span>

          <span class="flex items-center w-full leading-tight">
            <span class="truncate">{{ next.title }}</span>
            <Icon name="heroicons-outline:chevron-double-right" class="flex-shrink-0 w-4 h-4 ml-2" />
          </span>
        </span>
      </NuxtLink>
    </div>
  </div>
</template>
