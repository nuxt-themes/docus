<script setup lang="ts">
import { useDocus } from '#imports'

const { theme } = useDocus()
</script>

<template>
  <div id="docus-page" class="flex min-h-screen w-full flex-col">
    <Debug v-if="theme?.debug" :config="theme?.debug" />

    <Navbar />

    <div class="flex flex-col">
      <NuxtPage />
    </div>

    <Footer />
  </div>
</template>
