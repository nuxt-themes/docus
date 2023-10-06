<script setup lang="ts">
const socials = ['twitter', 'facebook', 'instagram', 'youtube', 'github', 'medium']

const { config } = useDocus()

const icons = computed<any>(() => {
  return Object.entries(config.value.socials || {})
    .map(([key, value]) => {
      if (typeof value === 'object') {
        return value
      } else if (typeof value === 'string' && value && socials.includes(key)) {
        return {
          href: `https://${key}.com/${value}`,
          icon: `fa-brands:${key}`,
          label: value,
          rel: 'noopener noreferrer'
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
    v-bind="$attrs"
    :key="icon.label"
    :rel="icon.rel"
    :title="icon.label"
    :aria-label="icon.label"
    :href="icon.href"
    target="_blank"
    class="flex p-4 text-secondary-static text-secondary-hover"
  >
    <Icon
      v-if="icon.icon"
      :name="icon.icon"
    />
  </NuxtLink>
</template>
