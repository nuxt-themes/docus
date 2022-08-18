<script setup lang="ts">
defineProps({
  size: {
    type: String,
    default: 'w-5 h-5'
  },
  spacing: {
    type: String,
    default: 'p-0'
  }
})

const socials = ['twitter', 'facebook', 'instagram', 'youtube', 'github', 'medium']
const theme = useTheme()
const icons = computed<any>(() => {
  theme.value.socials = theme.value.socials || {}

  return Object.entries(theme.value.socials)
    .map(([key, value]) => {
      if (typeof value === 'object') {
        return value
      } else if (typeof value === 'string' && socials.includes(key)) {
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
  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <NuxtLink
    v-for="icon in icons"
    :key="icon.label"
    rel="noopener noreferrer"
    :title="icon.label"
    :aria-label="icon.label"
    :href="icon.href"
    target="_blank"
    class="u-text-gray-700 hover:u-text-gray-900"
    :class="[spacing]"
  >
    <Icon v-if="icon.icon" :name="icon.icon" :class="size" />
  </NuxtLink>
</template>
