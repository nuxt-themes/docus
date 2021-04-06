<template>
  <span class="inline-flex">
    <button
      slot="placeholder"
      class="w-6 h-6 d-icon"
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
