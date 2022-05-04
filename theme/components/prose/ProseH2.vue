<script setup lang="ts">
defineProps<{ id: string }>()
</script>

<template>
  <h2 :id="id">
    <NuxtLink :href="`#${id}`">
      <slot />
    </NuxtLink>
  </h2>
</template>

<style lang="postcss" scoped>
h2 {
  font-size: 1.5rem;
  @apply mt-[1.25em] mb-[0.5em] font-semibold leading-snug tracking-tight;
}

h2 + * {
  @apply mt-0;
}
</style>
