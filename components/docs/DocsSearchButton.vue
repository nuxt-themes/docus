<script setup lang="ts">
const { isMac } = useUserAgent()
</script>

<template>
  <button
    class="doc-search flex items-center bg-gray-200 dark:bg-gray-800 bg-opacity-50 dark:bg-opacity-50 py-2.5 px-4 rounded-2xs border border-gray-200 dark:border-transparent text-sm gap-2 shadow-light-up-sm text-secondary-static text-secondary-hover"
    type="button"
    aria-label="Search"
    v-bind="$attrs"
  >
    <Icon
      name="heroicons-outline:search"
      class="w-4 h-4"
    />
    <span class="placeholder hidden lg:block">Search</span>
    <span class="shortcuts hidden xs:block ml-auto [&_kbd]:font-body">
      <ClientOnly>
        <kbd>{{ isMac ? '⌘' : 'Ctrl' }}</kbd>
        <kbd>K</kbd>
      </ClientOnly>
    </span>
  </button>
</template>
