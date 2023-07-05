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
    default: ''
  },
  description: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="section-header">
    <span v-if="subtitle || $slots.subtitle" class="section-header-subtitle">
      <ContentSlot :use="$slots.subtitle" unwrap="p">
        {{ subtitle }}
      </ContentSlot>
    </span>

    <h2 v-if="title || $slots.title" class="section-header-title">
      <ContentSlot :use="$slots.title" unwrap="p">
        {{ title }}
      </ContentSlot>
    </h2>

    <p v-if="description || $slots.description" class="section-header-description">
      <ContentSlot :use="$slots.description" unwrap="p">
        {{ description }}
      </ContentSlot>
    </p>
  </div>
</template>

<style scoped lang="ts">
css({
  '.section-header': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: '{docus.landing.sectionHeader.alignItems}',
    marginBottom: '{docus.landing.sectionHeader.marginBottom}',
  },

  '.section-header-subtitle': {
    '--subtitleColor': (props) => props.subtitleColor,
    display: 'block',
    fontSize: '{docus.landing.sectionHeader.subtitle.fontSize}',
    lineHeight: '{docus.landing.sectionHeader.subtitle.lineHeight}',
    fontWeight: '{docus.landing.sectionHeader.subtitle.fontWeight}',
    color: 'var(--subtitleColor)',
    marginBottom: '{docus.landing.sectionHeader.subtitle.marginBottom}',
    letterSpacing: '{docus.landing.sectionHeader.subtitle.letterSpacing}',
  },

  '.section-header-title': {
    marginBottom: '{docus.landing.sectionHeader.title.marginBottom}',
    fontSize: '{docus.landing.sectionHeader.title.fontSize}',
    lineHeight: '{docus.landing.sectionHeader.title.lineHeight}',
    fontWeight: '{docus.landing.sectionHeader.title.fontWeight}',
    letterSpacing: '{docus.landing.sectionHeader.title.letterSpacing}',
    color: '{docus.landing.sectionHeader.title.color}',
  },

  '.section-header-description': {
    color: '{docus.landing.sectionHeader.description.color}',
  }
})
</style>
