<script setup lang="ts">
defineProps({
  subtitle: {
    type: String,
    default: 'Section subtitle'
  },
  subtitleColor: {
    type: String,
    default: '{color.primary.500}'
  },
  title: {
    type: String,
    default: 'Section title'
  }
})
</script>

<template>
  <div>
    <span v-if="subtitle || $slots.subtitle" class="subtitle">
      <ContentSlot :use="$slots.subtitle" unwrap="p">
        {{ subtitle }}
      </ContentSlot>
    </span>

    <h2 v-if="title || $slots.title" class="title">
      <ContentSlot :use="$slots.title" unwrap="p">
        {{ title }}
      </ContentSlot>
    </h2>
  </div>
</template>

<style scoped lang="ts">
css({
  '.subtitle': {
    '--subtitleColor': (props) => props.subtitleColor,
    display: 'block',
    fontSize: '{docus.landing.sectionHeader.subtitle.fontSize}',
    lineHeight: '{docus.landing.sectionHeader.subtitle.lineHeight}',
    fontWeight: '{docus.landing.sectionHeader.subtitle.fontWeight}',
    color: 'var(--subtitleColor)',
    marginBottom: '{docus.landing.sectionHeader.subtitle.marginBottom}',
    letterSpacing: '{docus.landing.sectionHeader.subtitle.letterSpacing}',
  },

  '.title': {
    width: '{docus.landing.sectionHeader.title.width}',
    marginBottom: '{docus.landing.sectionHeader.title.marginBottom}',
    fontSize: '{docus.landing.sectionHeader.title.fontSize}',
    lineHeight: '{docus.landing.sectionHeader.title.lineHeight}',
    fontWeight: '{docus.landing.sectionHeader.title.fontWeight}',
    letterSpacing: '{docus.landing.sectionHeader.title.letterSpacing}',
    color: '{docus.landing.sectionHeader.title.color}',
    gradientText: '{docus.landing.sectionHeader.title.gradientText}',
  },
})
</style>
