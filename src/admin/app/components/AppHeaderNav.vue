<template>
  <div class="flex items-center ml-4 space-x-2 flex-auto pr-2">
    <!-- Editor -->
    <RouterLink to="/" class="relative flex-none px-4 py-1 text-sm font-medium leading-5 d-border border rounded-md">
      Pages
    </RouterLink>

    <!-- :class used as this route is undefined in the router -->
    <RouterLink
      to="/static"
      class="relative flex-none px-4 py-1 text-sm font-medium leading-5 d-border border rounded-md"
      :class="[$route.path.startsWith('/static') ? 'router-link-active' : '']"
    >
      Static
    </RouterLink>

    <RouterLink
      to="/components"
      class="relative flex-none px-4 py-1 text-sm font-medium leading-5 d-border border rounded-md"
      :class="[$route.path.startsWith('/components') ? 'router-link-active' : '']"
    >
      Components
    </RouterLink>

    <RouterLink
      to="/config"
      class="relative flex-none px-4 py-1 text-sm font-medium leading-5 d-border border rounded-md"
      :class="[$route.path.startsWith('/config') ? 'router-link-active' : '']"
    >
      Config
    </RouterLink>

    <RouterLink
      to="/windicss"
      class="relative flex-none px-4 py-1 text-sm font-medium leading-5 d-border border rounded-md"
      :class="[$route.path.startsWith('/windicss') ? 'router-link-active' : '']"
    >
      Windi Analyzer
    </RouterLink>

    <div class="flex-auto"></div>

    <button class="p-1 opacity-50 hover:opacity-100 !outline-none" @click="toggleDark">
      <heroicons-outline-moon v-if="isDark" />
      <heroicons-outline-sun v-else />
    </button>
  </div>
</template>

<script setup lang="ts">
import { toggleDark, isDark } from '../composables/dark'
</script>

<style lang="postcss">
.router-link-active {
  @apply border-blue-500 bg-blue-400 bg-opacity-25;
}
</style>
