<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: 'Features'
  }
})
</script>

<template>
  <section class="card-grid">
    <ContentSlot :use="$slots.root" unwrap="*" />

    <h2 class="title">
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
    position: 'relative',
    paddingBottom: '{space.20}',
    '@mq.sm': {
      paddingBottom: '{space.24}',
    },
    '@mq.lg': {
      paddingBottom: '{space.32}',
    },
    '.title': {
      marginBottom: '{space.8}',
      fontSize: '{text.3xl.fontSize}',
      lineHeight: '{text.3xl.lineHeight}',
      fontWeight: '{fontWeights.bold}',
      letterSpacing: '{letterSpacings.tight}',
      color: '{docus.text.color.primary}',
      '@mq.sm': {
        fontSize: '{text.4xl.fontSize}',
        lineHeight: '{text.4xl.lineHeight}',
      }
    },
    '.layout': {
      display: 'grid',
      gap: '{space.4}',
      fontWeight: '{fontWeights.semibold}',
      textAlign: 'left',
      color: '{docus.text.color.primary}',
      '@mq.sm': {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'
      },
      '@mq.lg': {
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))'
      },
      '@mq.2xl': {
        gap: '{space.8}'
      }
    }
  }
})
</style>