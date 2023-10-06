<script setup lang="ts">
defineProps({
  gap: {
    type: [String, Object],
    default: 'gap-4 2xl:gap-6'
  }
})
</script>

<template>
  <div class="card-grid relative w-full">
    <ContentSlot :use="$slots.root" />

    <div
      class="card-grid-layout grid grid-cols-12 grid-flow-dense"
      :class="[gap]"
    >
      <slot />
    </div>
  </div>
</template>
