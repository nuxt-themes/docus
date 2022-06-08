<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: 'Features',
  },
})
</script>

<template>
  <section>
    <Container padded class="relative w-full py-8">
      <Markdown :use="$slots.root" unwrap="*" />

      <h2 class="mb-8 text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
        <slot name="title" />
      </h2>
      <div class="grid gap-4 text-left font-semibold text-gray-900 dark:text-gray-100 sm:grid-cols-2 lg:grid-cols-3 2xl:gap-8">
        <slot />
      </div>
    </Container>
  </section>
</template>
