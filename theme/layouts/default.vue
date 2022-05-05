<script setup lang="ts">
import { computed, useDocus } from '#imports'

const { theme, page } = useDocus()
</script>

<template>
  <div id="docus-docs-page" class="flex min-h-screen flex-col">
    <template v-if="theme?.debug">
      <component is="debug" :config="theme?.debug" />
    </template>

    <Navbar />

    <DocsPageContent class="flex-1">
      <NuxtPage />
    </DocsPageContent>

    <Footer />
  </div>
</template>
