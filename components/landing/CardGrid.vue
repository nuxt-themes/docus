<script setup lang="ts">
const props = defineProps({
  cols: {
    type: [String, Number, Object],
    default: 3
  }
})
</script>

<template>
  <div class="card-grid">
    <svg class="card-noise">
      <filter id="card-noise">
        <feTurbulence type="fractalNoise" baseFrequency="7.5" />
      </filter>
    </svg>

    <ContentSlot :use="$slots.root" />

    <div class="card-grid-layout">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="ts">
css({
  '.card-grid': {
    position: 'relative',
    paddingBottom: '{docus.landing.cardGrid.paddingBottom}',
    '.card-grid-layout': {
      textAlign: 'start',
      display: 'grid',
      gridTemplateColumns: props => `repeat(${props.cols}, 1fr)`,
      gap: '{docus.landing.cardGrid.layout.gap}',
      gridAutoRows: 'minmax(180px, auto)',
      gridAutoFlow: 'dense',
    },
    '.card-noise': {
      display: 'none',
    }
  }
})
</style>
