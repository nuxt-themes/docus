<script setup lang="ts">
import { useDocSearch } from '#imports'

const { element } = useDocSearch()

const onClick = () => element.value.querySelector('button').click()
</script>

<template>
  <div class="relative pointer-events-auto group" @click="onClick">
    <button
      type="button"
      class="u-text-gray-500 hover:u-text-gray-700 transition-colors duration-300 w-full flex items-center text-sm leading-6 text-slate-400 rounded-md ring-1 dark:ring-gray-900 ring-gray-100 group-hover:ring-gray-500 hover:ring-gray-500 shadow-sm py-1.5 pl-2 pr-3"
    >
      <Icon name="heroicons-outline:search" class="mr-3 flex-none" />
      <span class="text-xs font-semibold">Search</span>
      <span class="ml-auto pl-3 flex-none text-xs font-semibold hidden md:block">⌘K</span>
    </button>
  </div>
</template>
