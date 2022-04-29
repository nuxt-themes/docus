<script setup lang="ts">
import { useDocus } from '#imports'

const { theme } = useDocus()
</script>

<template>
  <div class="w-full flex min-h-screen flex-col">
    <Debug v-if="theme?.debug" :config="theme?.debug" />

    <div class="min-h-[calc(100vh-12rem)] sm:min-h-[calc(100vh-8rem)] flex flex-col">
      <Navbar />

      <DocsPage>
        <template #aside>
          <DocsAside />
        </template>

        <DocsPageContent>
          <div class="max-w-none">
            <NuxtPage />
          </div>
        </DocsPageContent>
      </DocsPage>
    </div>

    <Footer />
  </div>
</template>
