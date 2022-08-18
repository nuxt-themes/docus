<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: 'Features'
  }
})
</script>

<template>
  <section class="relative pb-20 sm:pb-24 lg:pb-32">
    <ContentSlot :use="$slots.root" unwrap="*" />

    <h2 class="mb-8 text-3xl font-bold tracking-tight u-text-gray-900 sm:text-4xl">
      <slot name="title" />
    </h2>
    <div class="grid gap-4 font-semibold text-left u-text-gray-900 sm:grid-cols-2 lg:grid-cols-3 2xl:gap-8">
      <slot />
    </div>
  </section>
</template>
