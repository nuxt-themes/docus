<script setup lang="ts">
const { theme } = useDocus()
</script>

<template>
  <div class="w-full flex min-h-screen flex-col">
    <Debug v-if="theme?.debug" :config="theme?.debug" />

    <Navbar />

    <div class="min-h-[calc(100vh-12rem)] sm:min-h-[calc(100vh-8rem)] flex flex-col">
      <NuxtPage />
    </div>

    <Footer />
  </div>
</template>
