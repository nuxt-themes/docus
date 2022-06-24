<script setup lang="ts">
import { useDocSearch } from '#imports'

const { element } = useDocSearch()

const onClick = () => element.value.querySelector('button').click()
</script>

<template>
  <div class="relative pointer-events-auto group" @click="onClick">
    <button
      type="button"
      class="u-text-gray-500 hover:u-text-gray-700 w-full flex items-center text-sm lg:rounded-md lg:ring-1 lg:u-ring-gray-100 lg:group-hover:u-ring-gray-300 lg:shadow-sm lg:py-1.5 lg:pl-2 lg:pr-3"
    >
      <Icon name="heroicons-outline:search" class="lg:mr-2 flex-none w-6 h-6 lg:w-4 lg:h-4" />
      <span class="text-xs font-medium hidden lg:block">Search</span>
      <span class="ml-auto pl-3 flex-none text-xs font-semibold hidden lg:block u-text-gray-400">⌘K</span>
    </button>
  </div>
</template>
