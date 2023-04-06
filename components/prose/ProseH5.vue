<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'

defineProps<{ id: string }>()

const { prose } = useAppConfig() as any
const hasIcon = computed(() => prose?.h5?.icon && prose?.headings?.icon)
const icon = computed(() => prose?.h5?.icon || prose?.headings?.icon)
</script>

<template>
  <h5 :id="id">
    <NuxtLink :href="`#${id}`">
      <slot />
      <Icon v-if="hasIcon" :name="icon" />
    </NuxtLink>
  </h5>
</template>

<style scoped lang="ts">
css({
  h5: {
    fontFamily: '{typography.font.display}',
    display: 'block',
    margin: '{prose.h5.margin}',
    fontSize: '{prose.h5.fontSize}',
    lineHeight: '{prose.h5.lineHeight}',
    fontWeight: '{prose.h5.fontWeight}',
    ':deep(.icon)': {
      marginInlineStart: '8px',
      display: 'inline-block',
      opacity: '0',
      transition: 'opacity 100ms',
      width: '{prose.h5.iconSize}',
      height: '{prose.h5.iconSize}',
    },
    '& a:hover': {
      ':deep(.icon)': {
        opacity: '1'
      }
    },
  }
})
</style>
