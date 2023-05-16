<template>
  <AppLayout>
    <svg class="noise-filter">
      <filter id="noise-filter">
        <feTurbulence type="fractalNoise" baseFrequency="7.5" />
      </filter>
    </svg>
    <NuxtPage />
  </AppLayout>
</template>

<style scoped lang="ts">
css({
  '.noise-filter': {
    display: 'none',
  }
})
</style>
