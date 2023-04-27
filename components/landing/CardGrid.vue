<script setup lang="ts">
const props = defineProps({
  cols: {
    type: [String, Number],
    default: 3
  },
  subtitleColor: {
    type: String,
    default: '{color.primary.500}'
  }
})
</script>

<template>
  <section class="card-grid">
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
    <div class="layout">
      <slot />
    </div>
  </section>
</template>

<style scoped lang="ts">
css({
  '.card-grid': {
    '--subtitleColor': (props) => props.subtitleColor,

    position: 'relative',
    paddingBottom: '{elements.cardGrid.paddingBottom}',
    margin: '{elements.cardGrid.margin}',
    // zIndex: 1,

    // '.card-noise': {
    //   opacity: 0
    // },

    '.subtitle': {
      display: 'block',
      fontSize: '{text.lg.fontSize}',
      lineHeight: '{text.lg.lineHeight}',
      // fontWeight: '{fontWeight.semibold}',
      color: 'var(--subtitleColor)',
      fontFamily: '{font.mono}',
      marginBottom: '{space.4}'
    },

    '.title': {
      marginBottom: '{elements.cardGrid.title.marginBottom}',
      fontSize: '{elements.cardGrid.title.fontSize}',
      lineHeight: '{elements.cardGrid.title.lineHeight}',
      fontWeight: '{elements.cardGrid.title.fontWeight}',
      letterSpacing: '{elements.cardGrid.title.letterSpacing}',
      // color: '{elements.cardGrid.title.color}',
      gradientText: '{docus.landing.blockHero.content.title.gradientText}',
    },
    '.layout': {
      // display: 'grid',
      // gap: '{elements.cardGrid.layout.gap}',
      textAlign: 'start',
      // gridTemplateColumns: '{elements.cardGrid.layout.gridTemplateColumns}',

      display: 'grid',
      gridTemplateColumns: props => `repeat(${props.cols}, 1fr)`,
      gap: '{elements.cardGrid.layout.gap}',
      gridAutoRows: 'minmax(180px, auto)',
      gridAutoFlow: 'dense',
    }
  }
})
</style>
