<template>
  <span class="inline-flex">
    <button
      class="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 transition-colors duration-200 focus:outline-none"
      aria-label="Color Mode"
      @click="$colorMode.value === 'dark' ? $colorMode.preference = 'light' : $colorMode.preference = 'dark'"
    >
      <client-only>
        <IconSun v-if="$colorMode.value === 'light'" class="w-6 h-6" />
        <IconMoon v-else class="w-6 h-6" />
      </client-only>
    </button>
  </span>
</template>
