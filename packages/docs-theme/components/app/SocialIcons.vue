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
const icons = computed(() => theme.value?.socials || [])
</script>

<template>
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
    <Component :is="icon.component" v-else-if="icon?.component" :class="[icon?.class ? icon.class : 'h-5 w-5']" />
  </a>
</template>
