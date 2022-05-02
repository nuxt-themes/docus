<script setup lang="ts">
import { useDocus } from '#imports'

const { theme } = useDocus()
</script>

<template>
  <div class="w-full flex flex-col">
    <Debug v-if="theme?.debug" :config="theme?.debug" />

    <div class="flex flex-col">
      <Navbar />

      <DocsPage>
        <template #aside>
          <DocsAside />
        </template>

        <DocsPageContent>
          <div class="max-w-none min-h-page">
            <NuxtPage />
          </div>
        </DocsPageContent>
      </DocsPage>
    </div>

    <Footer />
  </div>
</template>
