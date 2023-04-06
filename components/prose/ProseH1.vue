<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'

defineProps<{ id: string }>()

const { prose } = useAppConfig() as any
const hasIcon = computed(() => prose?.h1?.icon && prose?.headings?.icon)
const icon = computed(() => prose?.h1?.icon || prose?.headings?.icon)
</script>

<template>
  <h1 :id="id">
    <NuxtLink :href="`#${id}`">
      <slot />
      <Icon v-if="hasIcon" :name="icon" />
    </NuxtLink>
  </h1>
</template>

<style scoped lang="ts">
css({
  h1: {
    fontFamily: '{typography.font.display}',
    display: 'block',
    margin: '{prose.h1.margin}',
    fontSize: '{prose.h1.fontSize}',
    lineHeight: '{prose.h1.lineHeight}',
    fontWeight: '{prose.h1.fontWeight}',
    letterSpacing: '{prose.h1.letterSpacing}',
    ':deep(.icon)': {
      marginInlineStart: '12px',
      display: 'inline-block',
      opacity: '0',
      transition: 'opacity 100ms',
      width: '{prose.h1.iconSize}',
      height: '{prose.h1.iconSize}',
    },
    '& a:hover': {
      ':deep(.icon)': {
        opacity: '1'
      }
    },
  },
})
</style>
