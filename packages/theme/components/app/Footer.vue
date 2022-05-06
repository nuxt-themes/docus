<script setup lang="ts">
import { computed, useDocus } from '#imports'

const { theme } = useDocus()

const icons = computed(() => theme.value?.footer?.icons || [])
</script>

<template>
  <footer class="h-footer bg-gray-50 py-6 dark:bg-gray-800 dark:bg-opacity-25 sm:py-0">
    <Container class="flex h-full flex-col items-center justify-between gap-y-4 sm:flex-row">
      <a
        v-if="theme?.footer?.credits"
        href="https://nuxtlabs.com"
        rel="noopener"
        target="_blank"
        class="text-secondary transition-base mb-3 flex items-end hover:text-gray-600 dark:hover:text-gray-100 sm:mb-0"
      >
        <Component :is="theme?.footer?.credits?.icon || 'Logo'" class="mr-2" />
        <p class="text-sm font-semibold">{{ theme?.footer?.credits?.text }}</p>
      </a>

      <div class="flex items-center gap-4">
        <a
          v-for="icon in icons"
          :key="icon.label"
          rel="noopener"
          :aria-label="icon.label"
          :href="icon.href"
          target="_blank"
          class="icon-base flex items-center text-sm font-medium"
        >
          <Component :is="icon.component" class="h-7 w-7" />
        </a>

        <SocialIcons size="w-6 h-6" />
      </div>
    </Container>
  </footer>
</template>
