<script setup lang="ts">
import { computed, useDocus } from '#imports'

defineProps({
  size: {
    type: String,
    default: 'w-5 h-5',
  },
  spacing: {
    type: String,
    default: 'p-0',
  },
})

const { theme } = useDocus()

const icons = computed(() => {
  theme.value.socials = theme.value.socials || {}

  return Object.entries(theme.value.socials)
    .map(([_key, value]) => {
      if (typeof value === 'object') {
        return value
      } else {
        return null
      }
    })
    .filter(Boolean)
})
</script>

<template>
  <a
    v-if="theme?.socials?.twitter"
    :href="`https://twitter.com/${theme.socials.twitter}`"
    target="_blank"
    rel="noopener noreferrer"
    :title="theme.socials.twitter"
    class="u-text-gray-500 hover:u-text-gray-700"
    :class="[spacing]"
  >
    <Icon name="fa-brands:twitter" :class="size" />
  </a>
  <a
    v-if="theme.socials?.github"
    :href="`https://github.com/${theme.socials.github}`"
    target="_blank"
    rel="noopener noreferrer"
    :title="theme.socials.github"
    class="u-text-gray-500 hover:u-text-gray-700"
    :class="[spacing]"
  >
    <Icon name="fa-brands:github" :class="size" />
  </a>

  <a
    v-for="icon in icons"
    :key="icon.label"
    rel="noopener noreferrer"
    :title="icon.label"
    :aria-label="icon.label"
    :href="icon.href"
    target="_blank"
    class="u-text-gray-500 hover:u-text-gray-700"
    :class="[spacing]"
  >
    <Icon v-if="icon.icon" :name="icon.icon" :class="size" />
  </a>
</template>
