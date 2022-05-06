<script setup lang="ts">
defineProps<{ id: string }>()
</script>

<template>
  <h4 :id="id">
    <NuxtLink :href="`#${id}`">
      <slot />
    </NuxtLink>
  </h4>
</template>

<style lang="postcss" scoped>
h4 {
  /* TODO */
  /* extend.fontSize do not work in Windi */
  font-size: 1.125rem;
  @apply mt-[1.25em] mb-[0.5em] font-semibold leading-snug tracking-tight;
}

h4 + * {
  @apply mt-0;
}
</style>
