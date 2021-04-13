<template>
  <span class="inline-flex">
    <button
      slot="placeholder"
      class="w-6 h-6 d-icon"
      aria-label="Color Mode"
      @click="$colorMode.value === 'dark' ? ($colorMode.preference = 'light') : ($colorMode.preference = 'dark')"
    >
      <ClientOnly>
        <IconSun v-if="$colorMode.value === 'light'" class="w-6 h-6" />
        <IconMoon v-else class="w-6 h-6" />
        <template #placeholder>...</template>
      </ClientOnly>
    </button>
  </span>
</template>
