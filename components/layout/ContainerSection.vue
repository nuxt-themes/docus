<script setup lang="ts">
const { config } = useDocus()

defineProps({
  margin: {
    type: String,
    default: '0'
  }
})
</script>

<template>
  <section class="container-section">
    <span v-if="$slots.root" class="root">
      <slot name="root" />
    </span>
    <Container
      :fluid="config?.main?.fluid"
      :padded="config?.main?.padded"
    >
      <slot />
    </Container>
  </section>
</template>

<style lang="ts" scoped>
css({
  section: {
    '--margin': (props) => props.margin,
    position: 'relative',
    margin: 'var(--margin)',
  }
})
</style>
