<script setup lang="ts">
import { useDocus } from '#imports'

defineProps({
  size: {
    type: String,
    default: 'w-4 h-4',
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
    :href="`https://twitter.com/${theme?.twitter}`"
    target="_blank"
    rel="noopener noreferrer"
    title="Twitter"
    name="Twitter"
    class="icon-base"
    :class="[spacing]"
  >
    <Icon name="fa-brands:twitter" :class="size" />
  </a>
  <a
    v-if="theme.github?.repository"
    :href="`https://github.com/${theme?.github?.repository}`"
    target="_blank"
    rel="noopener noreferrer"
    title="GitHub"
    name="GitHub"
    class="icon-base"
    :class="[spacing]"
  >
    <Icon name="fa-brands:github" :class="size" />
  </a>
</template>
