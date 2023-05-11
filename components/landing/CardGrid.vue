<script setup lang="ts">
defineProps({
  cols: {
    type: [String, Number, Object],
    default: 3
  },
  subtitleColor: {
    type: String,
    default: '{color.primary.500}'
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

    <span v-if="$slots.subtitle" class="subtitle">
      <ContentSlot :use="$slots.subtitle" unwrap="p" />
    </span>

    <h2 v-if="$slots.title" class="title">
      <ContentSlot :use="$slots.title" unwrap="p" />
    </h2>

    <div class="card-grid-layout">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="ts">
css({
  '.card-grid': {
    '--subtitleColor': (props) => props.subtitleColor,

    position: '{docus.landing.cardGrid.position}',
    paddingBottom: '{docus.landing.cardGrid.paddingBottom}',

    '.subtitle': {
      display: 'block',
      fontSize: '{docus.landing.cardGrid.subtitle.fontSize}',
      lineHeight: '{docus.landing.cardGrid.subtitle.lineHeight}',
      fontWeight: '{docus.landing.cardGrid.subtitle.fontWeight}',
      color: 'var(--subtitleColor)',
      marginBottom: '{docus.landing.cardGrid.subtitle.marginBottom}',
      letterSpacing: '{docus.landing.cardGrid.subtitle.letterSpacing}',
    },

    '.title': {
      width: '{docus.landing.cardGrid.title.width}',
      marginBottom: '{docus.landing.cardGrid.title.marginBottom}',
      fontSize: '{docus.landing.cardGrid.title.fontSize}',
      lineHeight: '{docus.landing.cardGrid.title.lineHeight}',
      fontWeight: '{docus.landing.cardGrid.title.fontWeight}',
      letterSpacing: '{docus.landing.cardGrid.title.letterSpacing}',
      color: '{docus.landing.cardGrid.title.color}',
      gradientText: '{docus.landing.cardGrid.title.gradientText}',
    },

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
