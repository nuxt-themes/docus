<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: 'Features',
  },
})
</script>

<template>
  <section class="pb-20 sm:pb-24 lg:pb-32">
    <Container padded class="relative w-full">
      <Markdown :use="$slots.root" unwrap="*" />

      <h2 class="u-text-gray-900 mb-8 text-3xl font-bold tracking-tight sm:text-4xl">
        <slot name="title" />
      </h2>
      <div class="u-text-gray-900 grid gap-4 text-left font-semibold sm:grid-cols-2 lg:grid-cols-3 2xl:gap-8">
        <slot />
      </div>
    </Container>
  </section>
</template>
