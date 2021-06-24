<template>
  <AppHeader />

  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <main class="flex items-stretch flex-grow h-full">
    <RouterView v-slot="{ Component }">
      <KeepAlive>
        <Component :is="Component" />
      </KeepAlive>
    </RouterView>
  </main>
</template>

<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
</script>
