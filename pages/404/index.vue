<script setup lang="ts">
definePageMeta({
  /* Layout transitions creates layout shifts with defaults */
  layoutTransition: false,
  layout: 'page',
  documentDriven: false,
})
</script>

<template>
  <NuxtLayout>
    <ErrorPage />
  </NuxtLayout>
</template>
