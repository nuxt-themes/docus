<script setup lang="ts">
import { computed, useDocus } from '#imports'

const { theme } = useDocus()

const icons = computed(() => theme.value?.footer?.icons || [])
</script>

<template>
  <footer class="h-footer u-border-gray-100 my-6 border-t sm:my-0">
    <Container padded class="flex h-full flex-col items-center justify-between gap-4 sm:flex-row">
      <a v-if="theme?.footer?.credits" :href="theme.footer.credits.href" rel="noopener" target="_blank" class="u-text-gray-500 hover:u-text-gray-700 flex items-center">
        <Component :is="theme.footer.credits.icon || 'Logo'" class="mr-2 h-5 w-5 fill-current" />
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
          class="u-text-gray-500 hover:u-text-gray-700 flex items-center text-sm font-medium"
        >
          <Icon v-if="icon.icon" :name="icon.icon" />
          <Component :is="icon.component" v-else-if="icon?.component" :class="[icon?.class ? icon.class : 'h-5 w-5']" />
        </a>

        <SocialIcons />
      </div>
    </Container>
  </footer>
</template>
