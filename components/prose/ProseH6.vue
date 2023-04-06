<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'

defineProps<{ id: string }>()

const { prose } = useAppConfig() as any
const hasIcon = computed(() => prose?.h6?.icon && prose?.headings?.icon)
const icon = computed(() => prose?.h6?.icon || prose?.headings?.icon)
</script>

<template>
  <h6 :id="id">
    <NuxtLink :href="`#${id}`">
      <slot />
      <Icon v-if="hasIcon" :name="icon" />
    </NuxtLink>
  </h6>
</template>

<style scoped lang="ts">
css({
  h6: {
    fontFamily: '{typography.font.display}',
    display: 'block',
    margin: '{prose.h6.margin}',
    fontSize: '{prose.h6.fontSize}',
    lineHeight: '{prose.h6.lineHeight}',
    fontWeight: '{prose.h6.fontWeight}',
    ':deep(.icon)': {
      marginInlineStart: '8px',
      display: 'inline-block',
      opacity: '0',
      transition: 'opacity 100ms',
      width: '{prose.h6.iconSize}',
      height: '{prose.h6.iconSize}',
    },
    '& a:hover': {
      ':deep(.icon)': {
        opacity: '1'
      }
    },
  }
})
</style>
