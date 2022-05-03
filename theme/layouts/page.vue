<script setup lang="ts">
import { useDocus } from '#imports'

const { theme } = useDocus()
</script>

<template>
  <div id="docus-page" class="w-full flex min-h-screen flex-col">
    <Debug v-if="theme?.debug" :config="theme?.debug" />

    <Navbar />

    <div class="flex flex-col">
      <NuxtPage />
    </div>

    <Footer />
  </div>
</template>
