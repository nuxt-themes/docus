<script setup lang="ts">
import { computed, useDocus } from '#imports'

const { theme } = useDocus()

const icons = computed(() => theme.value?.footer?.icons || [])
</script>

<template>
  <footer class="py-6 sm:py-0 bg-gray-50 dark:bg-gray-800 dark:bg-opacity-25 h-header">
    <Container class="flex h-full flex-col gap-y-4 sm:flex-row justify-between items-center">
      <a
        v-if="theme?.footer?.credits"
        href="https://nuxtlabs.com"
        rel="noopener"
        target="_blank"
        class="flex items-end text-secondary transition-base dark:hover:text-gray-100 hover:text-gray-600 mb-3 sm:mb-0"
      >
        <Component :is="theme?.footer?.credits?.icon || 'Logo'" class="mr-2" />
        <p class="font-semibold text-sm">{{ theme?.footer?.credits?.text }}</p>
      </a>

      <div class="flex">
        <a
          v-for="icon in icons"
          :key="icon.label"
          rel="noopener"
          :aria-label="icon.label"
          :href="icon.href"
          target="_blank"
          class="text-sm flex items-center font-medium p-1 icon-base"
        >
          <Component :is="icon.component" class="w-8 h-8" />
        </a>

        <SocialIcons size="w-8 h-8" padding="p-1" />
      </div>
    </Container>
  </footer>
</template>
