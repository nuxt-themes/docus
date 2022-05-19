<script setup lang="ts">
import { computed, useDocus } from '#imports'

const { theme } = useDocus()

const icons = computed(() => theme.value?.footer?.icons || [])
</script>

<template>
  <footer class="py-6 h-footer bg-gray-50 dark:bg-gray-800 dark:bg-opacity-25 sm:py-0">
    <Container padded class="flex flex-col items-center justify-between h-full gap-y-4 sm:flex-row">
      <a
        v-if="theme?.footer?.credits"
        :href="theme.footer.credits.href"
        rel="noopener"
        target="_blank"
        class="flex items-center mb-3 transition-colors text-secondary transition-base hover:text-secondary-hover sm:mb-0"
      >
        <Component :is="theme.footer.credits.icon || 'Logo'" class="w-4 h-4 mr-2 fill-current" />
        <p class="text-sm font-semibold">{{ theme.footer.credits.text }}</p>
      </a>

      <div class="flex items-center gap-4">
        <a
          v-for="icon in icons"
          :key="icon.label"
          rel="noopener"
          :aria-label="icon.label"
          :href="icon.href"
          target="_blank"
          class="flex items-center text-sm font-medium icon-base"
        >
          <Component :is="icon.component" />
        </a>

        <SocialIcons />
      </div>
    </Container>
  </footer>
</template>
