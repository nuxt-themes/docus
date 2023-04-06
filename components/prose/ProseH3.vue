<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'

defineProps<{ id: string }>()

const { prose } = useAppConfig() as any
const hasIcon = computed(() => prose?.h3?.icon && prose?.headings?.icon)
const icon = computed(() => prose?.h3?.icon || prose?.headings?.icon)
</script>

<template>
  <h3 :id="id">
    <NuxtLink :href="`#${id}`">
      <slot />
      <Icon v-if="hasIcon" :name="icon" />
    </NuxtLink>
  </h3>
</template>

<style scoped lang="ts">
css({
  h3: {
    fontFamily: '{typography.font.display}',
    display: 'block',
    margin: '{prose.h3.margin}',
    fontSize: '{prose.h3.fontSize}',
    lineHeight: '{prose.h3.lineHeight}',
    fontWeight: '{prose.h3.fontWeight}',
    letterSpacing: '{prose.h3.letterSpacing}',
    ':deep(.icon)': {
      marginInlineStart: '12px',
      display: 'inline-block',
      opacity: '0',
      transition: 'opacity 100ms',
      width: '{prose.h3.iconSize}',
      height: '{prose.h3.iconSize}',
    },
    '& a:hover': {
      ':deep(.icon)': {
        opacity: '1'
      }
    },
  }
})
</style>
