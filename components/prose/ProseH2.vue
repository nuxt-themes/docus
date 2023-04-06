<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'

defineProps<{ id: string }>()

const { prose } = useAppConfig() as any
const hasIcon = computed(() => prose?.h2?.icon && prose?.headings?.icon)
const icon = computed(() => prose?.h2?.icon || prose?.headings?.icon)
</script>

<template>
  <h2 :id="id">
    <NuxtLink :href="`#${id}`">
      <slot />
      <Icon v-if="hasIcon" :name="icon" />
    </NuxtLink>
  </h2>
</template>

<style scoped lang="ts">
css({
  h2: {
    fontFamily: '{typography.font.display}',
    display: 'block',
    margin: '{prose.h2.margin}',
    fontSize: '{prose.h2.fontSize}',
    lineHeight: '{prose.h2.lineHeight}',
    fontWeight: '{prose.h2.fontWeight}',
    letterSpacing: '{prose.h2.letterSpacing}',
    ':deep(.icon)': {
      marginInlineStart: '12px',
      display: 'inline-block',
      opacity: '0',
      transition: 'opacity 100ms',
      width: '{prose.h2.iconSize}',
      height: '{prose.h2.iconSize}',
    },
    '& a:hover': {
      ':deep(.icon)': {
        opacity: '1'
      }
    },
  }
})
</style>
