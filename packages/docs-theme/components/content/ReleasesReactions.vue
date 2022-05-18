<script setup lang="ts">
import { computed } from '#imports'

const props = defineProps({
  release: {
    type: Object,
    required: true,
  },
})

const map = {
  '+1': '👍',
  '-1': '👎',
  laugh: '😂',
  hooray: '🎉',
  confused: '😕',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}

const reactions = computed(() => {
  if (!props.release?.reactions) {
    return {}
  }

  return Object.entries(props.release?.reactions).reduce((acc, [key, value]) => {
    if (['url', 'total_count'].includes(key) || value === 0) return acc

    acc.push({
      key,
      value,
    })

    return acc
  }, [])
})
</script>

<template>
  <div v-if="reactions.length" class="flex flex-wrap flex-1 gap-4">
    <Badge v-for="reaction of reactions" :key="reaction.key" type="gray">
      {{ map[reaction.key] }}
      <span class="ml-2 font-semibold">
        {{ reaction.value }}
      </span>
    </Badge>
  </div>
</template>
