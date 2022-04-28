<script setup lang="ts">
defineProps<{ id: string }>()
</script>

<template>
  <h3 :id="id">
    <NuxtLink :href="`#${id}`">
      <slot />
    </NuxtLink>
  </h3>
</template>

<style lang="postcss" scoped>
h3 {
  /* TODO */
  /* extend.fontSize do not work in Windi */
  font-size: 1.25rem;
  @apply tracking-tight leading-snug font-semibold mt-[1.25em] mb-[0.5em];
}

h3 + * {
  @apply mt-0;
}
</style>
