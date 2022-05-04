<script setup lang="ts">
defineProps<{ id: string }>()
</script>

<template>
  <h1 :id="id">
    <NuxtLink :href="`#${id}`">
      <slot />
    </NuxtLink>
  </h1>
</template>
>

<style lang="postcss" scoped>
h1 {
  font-size: 2rem;
  @apply mt-[1em] mb-[0.5em] font-semibold leading-snug tracking-tight;
}

h1 + * {
  @apply mt-0;
}
</style>
