<script setup lang="ts">
import { useDocus } from '#imports'

const { theme } = useDocus()
</script>

<template>
  <div id="docus-page" class="flex min-h-screen w-full flex-col">
    <template v-if="theme?.debug">
      <component :is="'debug'" :config="theme?.debug" />
    </template>

    <Navbar />

    <div class="flex flex-1 flex-col">
      <NuxtPage />
    </div>

    <Footer />
  </div>
</template>
