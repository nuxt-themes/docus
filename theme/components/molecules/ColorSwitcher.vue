<template>
  <span class="inline-flex">
    <button
      class="text-gray-400 transition-colors duration-200 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none"
      aria-label="Color Mode"
      @click="$colorMode.value === 'dark' ? $colorMode.preference = 'light' : $colorMode.preference = 'dark'"
    >
      <client-only>
        <IconSun v-if="$colorMode.value === 'light'" class="w-5 h-5 md:w-6 md:h-6" />
        <IconMoon v-else class="w-5 h-5 md:w-6 md:h-6" />
      </client-only>
    </button>
  </span>
</template>
