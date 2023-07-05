<script setup lang="ts">
const { config } = useDocus()

defineProps({
  margin: {
    type: [String, Object],
    default: '0'
  },
  padding: {
    type: [String, Object],
    default: '0'
  },
  backgroundColor: {
    type: [String, Object],
    default: 'transparent'
  },
  backgroundImage: {
    type: [String, Object],
    default: 'none'
  }
})
</script>

<template>
  <section class="container-section">
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

<style lang="ts" scoped>
css({
  section: {
    '--margin': (props) => props.margin,
    '--padding': (props) => props.padding,
    '--backgroundColor': (props) => props.backgroundColor,
    '--backgroundImage': (props) => props.backgroundImage,
    position: 'relative',
    margin: 'var(--margin)',
    padding: 'var(--padding)',
    backgroundColor: 'var(--backgroundColor)',
    backgroundImage: 'var(--backgroundImage)',
  }
})
</style>
