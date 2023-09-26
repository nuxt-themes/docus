<script setup lang="ts">
const { config } = useDocus()

defineProps({
  margin: {
    type: String,
    default: 'm-0'
  },
  padding: {
    type: String,
    default: 'm-0'
  },
  backgroundColor: {
    type: String,
    default: 'bg-transparent'
  },
  backgroundImage: {
    type: String,
    default: 'bg-none'
  }
})
</script>

<template>
  <section
    class="container-section relative"
    :class="[margin, padding, backgroundColor, backgroundImage]"
  >
    <span
      v-if="$slots.root"
      class="root"
    >
      <slot name="root" />
    </span>
    <Container
      :padded="config?.main?.padded"
    >
      <slot />
    </Container>
  </section>
</template>

