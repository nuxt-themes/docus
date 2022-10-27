<script setup lang="ts">
import { computedStyle } from 'pinceau/runtime'

defineProps({
  size: computedStyle('gap', '5', false)
})

const socials = ['twitter', 'facebook', 'instagram', 'youtube', 'github', 'medium']

const docus = useDocus()

const icons = computed(() => {
  return Object.entries(docus.value.socials || {})
    .map(([key, value]) => {
      if (typeof value === 'object') {
        return value
      } else if (typeof value === 'string' && value && socials.includes(key)) {
        return {
          href: `https://${key}.com/${value}`,
          icon: `fa-brands:${key}`,
          label: value
        }
      } else {
        return null
      }
    })
    .filter(Boolean)
})
</script>

<template>
  <NuxtLink
    v-for="icon in icons"
    :key="icon.label"
    rel="noopener noreferrer"
    :title="icon.label"
    :aria-label="icon.label"
    :href="icon.href"
    target="_blank"
  >
    <Icon v-if="icon.icon" :name="icon.icon" :size="size" />
  </NuxtLink>
</template>

<style lang="ts" scoped>
css({
  a: {
    color: '{colors.gray.500}',

    '@dark': {
      color: '{colors.gray.400}'
    },

    '&:hover': {
      color: '{colors.gray.700}',
      '@dark': {
        color: '{colors.gray.200}',
      }
    },
  }
})
</style>
