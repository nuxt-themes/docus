<template>
  <span class="inline-flex">
    <button
      slot="placeholder"
      class="w-6 h-6 text-gray-500 transition-colors duration-200 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-400 focus:outline-none"
      aria-label="Color Mode"
      @click="$colorMode.value === 'dark' ? $colorMode.preference = 'light' : $colorMode.preference = 'dark'"
    >
      <client-only>
        <IconSun v-if="$colorMode.value === 'light'" class="w-6 h-6" />
        <IconMoon v-else class="w-6 h-6" />
        <template #placeholder>...</template>
      </client-only>
    </button>
  </span>
</template>
