<script setup lang="ts">
const { element } = useDocSearch()

const onClick = () => element.value.querySelector('button').click()
</script>

<template>
  <div class="relative pointer-events-auto group" @click="onClick">
    <button
      type="button"
      aria-label="Search"
      class="u-text-gray-500 hover:u-text-gray-700 lg:border lg:u-border-gray-100 lg:group-hover:u-border-gray-300 flex w-full items-center text-sm lg:rounded-md lg:py-1.5 lg:pl-2 lg:pr-3 lg:shadow-sm"
    >
      <Icon name="heroicons-outline:search" class="flex-none w-6 h-6 lg:mr-2 lg:h-4 lg:w-4" />
      <span class="hidden text-xs font-medium lg:block">Search</span>
      <span class="flex-none hidden pl-3 ml-auto text-xs font-semibold u-text-gray-400 lg:block">
        <kbd>⌘</kbd>
        <kbd>K</kbd>
      </span>
    </button>
  </div>
</template>
