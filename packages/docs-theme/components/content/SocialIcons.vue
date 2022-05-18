<script setup lang="ts">
import { useDocus } from '#imports'

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
</script>

<template>
  <a
    v-if="theme?.socials?.twitter"
    :href="`https://twitter.com/${theme.socials.twitter}`"
    target="_blank"
    rel="noopener noreferrer"
    :title="theme.socials.twitter"
    class="icon-base"
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
    class="icon-base"
    :class="[spacing]"
  >
    <Icon name="fa-brands:github" :class="size" />
  </a>
</template>
