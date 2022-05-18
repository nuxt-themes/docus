<script setup lang="ts">
definePageMeta({
  /* Layout transitions creates layout shifts with defaults */
  layoutTransition: false,
  layout: 'page',
  middleware: ['navigation', 'github'],
})
</script>

<template>
  <ErrorPage />
</template>
