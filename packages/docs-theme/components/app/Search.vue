<script setup lang="ts">
import { useDocSearch } from '#imports'

const { element } = useDocSearch()

const onClick = () => element.value.querySelector('button').click()
</script>

<template>
  <div class="relative pointer-events-auto group" @click="onClick">
    <button
      type="button"
      class="u-text-gray-500 hover:u-text-gray-700 duration-300 w-full flex items-center text-sm leading-6 rounded-md ring-1 u-ring-gray-100 group-hover:u-ring-gray-300 shadow-sm py-1.5 pl-2 pr-3"
    >
      <Icon name="heroicons-outline:search" class="mr-2 flex-none w-4 h-4" />
      <span class="text-xs font-medium">Search</span>
      <span class="ml-auto pl-3 flex-none text-xs font-semibold hidden md:block u-text-gray-400">⌘K</span>
    </button>
  </div>
</template>
