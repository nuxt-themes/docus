<template>
  <AppLayout>
    <svg class="noise-filter hidden">
      <filter id="noise-filter">
        <feTurbulence type="fractalNoise" baseFrequency="7.5" />
      </filter>
    </svg>
    <NuxtPage />
  </AppLayout>
</template>

