<script setup lang="ts">
import { useDocus } from '#imports'

const { theme } = useDocus()
</script>

<template>
  <div id="docus-docs-page">
    <template v-if="theme?.debug">
      <component is="debug" :config="theme?.debug" />
    </template>

    <Navbar />

    <DocsPageContent class="min-h-page overflow-x-hidden">
      <NuxtPage />
    </DocsPageContent>

    <Footer />
  </div>
</template>
