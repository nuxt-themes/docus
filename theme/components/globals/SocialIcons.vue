<script setup lang="ts">
import { useDocus } from '#imports'

defineProps({
  size: {
    type: String,
    default: 'w-6 h-6',
  },
  padding: {
    type: String,
    default: 'p-0',
  },
})

const { theme } = useDocus()
</script>

<template>
  <div class="flex">
    <a v-if="theme.twitter" :href="`https://twitter.com/${theme.twitter}`" target="_blank" rel="noopener noreferrer" title="Twitter" name="Twitter" class="icon-base" :class="[padding]">
      <IconTwitter :class="size" />
    </a>
    <a v-if="theme.github" :href="`https://github.com/${theme.github}`" target="_blank" rel="noopener noreferrer" title="GitHub" name="GitHub" class="icon-base" :class="[padding]">
      <IconGitHub :class="size" />
    </a>
  </div>
</template>
