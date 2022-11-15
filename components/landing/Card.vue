<script setup lang="ts">
defineProps({
  icon: {
    type: String,
    default: ''
  },
  iconClass: {
    type: String,
    default: ''
  },
  blurry: {
    type: Boolean,
    default: true,
    required: false
  }
})
</script>

<template>
  <div :class="{ blurry }" class="card">
    <Icon v-if="icon" :name="icon" />
    <slot />
    <div>
      <h3 class="title">
        <ContentSlot :use="$slots.title" unwrap="p">
          Card title
        </ContentSlot>
      </h3>
      <p class="description">
        <ContentSlot :use="$slots.description" unwrap="p">
          Card description
        </ContentSlot>
      </p>
    </div>
  </div>
</template>

<style scoped lang="ts">
css({
  '.card': {
    display: 'block',
    position: 'relative',
    width: '100%',
    padding: '{space.8}',
    borderRadius: '{radii.xl}',
    border: '1px solid {colors.gray.200}',
    background: '{backdrop.background}',
    '@dark': {
      borderColor: '{colors.gray.900}',
      color: '{colors.gray.50}'
    },
    '&.blurry': {
      backdropFilter: '{backdrop.filter}',
    },
    '.icon': {
      display: 'inline-block',
      marginBottom: '{space.2}',
      width: '{space.6}',
      height: '{space.6}'
    },
    '.title': {
      marginBottom: '{space.2}',
      fontSize: '{text.lg.fontSize}',
      lineHeight: '{text.lg.lineHeight}',
      fontWeight: '{fontWeights.semibold}'
    },
    '.description': {
      fontSize: '{text.sm.fontSize}',
      lineHeight: '{text.sm.lineHeight}',
      fontWeight: '{fontWeights.medium}',
      color: '{docus.text.color.secondary}'
    }
  }
})
</style>
