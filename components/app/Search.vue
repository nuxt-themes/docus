<script setup lang="ts">
import { useDocSearch } from '#imports'

const { element } = useDocSearch()

const onClick = () => element.value.querySelector('button').click()
</script>

<template>
  <div class="group pointer-events-auto relative" @click="onClick">
    <button
      type="button"
      class="u-text-gray-500 hover:u-text-gray-700 lg:u-ring-gray-100 lg:group-hover:u-ring-gray-300 flex w-full items-center text-sm lg:rounded-md lg:py-1.5 lg:pl-2 lg:pr-3 lg:shadow-sm lg:ring-1"
    >
      <Icon name="heroicons-outline:search" class="h-6 w-6 flex-none lg:mr-2 lg:h-4 lg:w-4" />
      <span class="hidden text-xs font-medium lg:block">Search</span>
      <span class="u-text-gray-400 ml-auto hidden flex-none pl-3 text-xs font-semibold lg:block">⌘K</span>
    </button>
  </div>
</template>
