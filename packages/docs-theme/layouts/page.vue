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

    <Container class="relative flex flex-col min-h-page lg:py-6 lg:gap-4 lg:px-6">
      <NuxtPage />
    </Container>

    <Footer />
  </div>
</template>
