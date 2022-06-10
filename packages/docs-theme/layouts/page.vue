<script setup lang="ts">
import { useDocus } from '#imports'

const { theme } = useDocus()
</script>

<template>
  <div id="docus-page" class="flex flex-col w-full min-h-screen">
    <template v-if="theme?.debug">
      <component is="debug" :config="theme?.debug" />
    </template>

    <Navbar />

    <Container class="relative flex flex-col px-4 py-2 sm:py-4 sm:px-6 min-h-page lg:py-8 lg:gap-4">
      <NuxtPage />
    </Container>

    <Footer />
  </div>
</template>
