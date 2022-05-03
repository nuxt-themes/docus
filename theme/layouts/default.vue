<script setup lang="ts">
import { computed, useDocus } from '#imports'

const { theme, page } = useDocus()

const showToc = computed(() => {
  if (typeof page.value?.toc !== 'undefined') return page.value.toc

  return true
})
</script>

<template>
  <div id="docus-docs-page" class="flex min-h-screen flex-col">
    <Debug v-if="theme?.debug" :config="theme?.debug" />

    <Navbar />

    <DocsPage class="flex-1">
      <template #aside>
        <DocsAside />
      </template>

      <DocsPageContent :toc="showToc">
        <NuxtPage />
      </DocsPageContent>
    </DocsPage>

    <Footer />
  </div>
</template>
