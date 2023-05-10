<script setup lang="ts">
const { config } = useDocus()

defineProps({
  margin: {
    type: String,
    default: '0'
  },
  subtitleColor: {
    type: String,
    default: '{color.primary.500}'
  }
})
</script>

<template>
  <section>
    <span v-if="$slots.root" class="root">
      <slot name="root" />
    </span>
    <Container
      :fluid="config?.main?.fluid"
      :padded="config?.main?.padded"
    >
      <span v-if="$slots.subtitle" class="subtitle">
        <ContentSlot :use="$slots.subtitle" unwrap="p" />
      </span>

      <h2 v-if="$slots.title" class="title">
        <ContentSlot :use="$slots.title" unwrap="p" />
      </h2>
      <slot />
    </Container>
  </section>
</template>

<style lang="ts" scoped>
css({
  section: {
    '--margin': (props) => props.margin,
    '--subtitleColor': (props) => props.subtitleColor,

    position: 'relative',
    margin: 'var(--margin)',

    '.subtitle': {
      display: 'block',
      fontSize: '{docus.landing.landingSection.subtitle.fontSize}',
      lineHeight: '{docus.landing.landingSection.subtitle.lineHeight}',
      fontWeight: '{docus.landing.landingSection.subtitle.fontWeight}',
      color: 'var(--subtitleColor)',
      marginBottom: '{docus.landing.landingSection.subtitle.marginBottom}',
      letterSpacing: '{docus.landing.landingSection.subtitle.letterSpacing}',
    },

    '.title': {
      width: '{docus.landing.landingSection.title.width}',
      marginBottom: '{docus.landing.landingSection.title.marginBottom}',
      fontSize: '{docus.landing.landingSection.title.fontSize}',
      lineHeight: '{docus.landing.landingSection.title.lineHeight}',
      fontWeight: '{docus.landing.landingSection.title.fontWeight}',
      letterSpacing: '{docus.landing.landingSection.title.letterSpacing}',
      color: '{docus.landing.landingSection.title.color}',
      gradientText: '{docus.landing.landingSection.title.gradientText}',
    },
  }
})
</style>
