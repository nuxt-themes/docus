<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'

defineProps<{ id: string }>()

const { prose } = useAppConfig() as any
const hasIcon = computed(() => prose?.h4?.icon && prose?.headings?.icon)
const icon = computed(() => prose?.h4?.icon || prose?.headings?.icon)
</script>

<template>
  <h4 :id="id">
    <NuxtLink :href="`#${id}`">
      <slot />
      <Icon v-if="hasIcon" :name="icon" />
    </NuxtLink>
  </h4>
</template>

<style scoped lang="ts">
css({
  h4: {
    fontFamily: '{typography.font.display}',
    display: 'block',
    margin: '{prose.h4.margin}',
    fontSize: '{prose.h4.fontSize}',
    lineHeight: '{prose.h4.lineHeight}',
    fontWeight: '{prose.h4.fontWeight}',
    letterSpacing: '{prose.h4.letterSpacing}',
    ':deep(.icon)': {
      marginInlineStart: '10px',
      display: 'inline-block',
      opacity: '0',
      transition: 'opacity 100ms',
      width: '{prose.h4.iconSize}',
      height: '{prose.h4.iconSize}',
    },
    '& a:hover': {
      ':deep(.icon)': {
        opacity: '1'
      }
    },
  }
})
</style>
