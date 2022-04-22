<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  tabs: {
    type: Array as PropType<{ label: string }[]>,
    required: true,
  },
  activeTabIndex: {
    type: Number,
    required: true,
  },
})

defineEmits(['update:activeTabIndex'])
</script>

<template>
  <div class="relative text-white rounded-t-lg bg-gray-200 dark:bg-gray-700">
    <div v-if="tabs" class="relative z-0 px-2">
      <button
        v-for="({ label }, i) in tabs"
        ref="tabs"
        :key="`${i}${label}`"
        class="relative px-3 py-1.5 xs:py-3 my-1.5 xs:my-0 text-sm font-mono font-medium tracking-tight focus:outline-none font-bold"
        :class="[activeTabIndex === i ? 'active text-gray-800 dark:text-white' : 'text-gray-600 dark:text-gray-400']"
        @click="$emit('update:activeTabIndex', i)"
      >
        {{ label }}
      </button>
      <span ref="highlight-underline" class="absolute -z-1 highlight-underline h-full xs:py-1.5">
        <span class="flex w-full h-full bg-gray-300 dark:bg-gray-600 rounded-md" />
      </span>
    </div>
  </div>
</template>

<style scoped>
.highlight-underline {
  /* bottom: -2px; */
  /* height: 2px; */
  transition: left 150ms, top 150ms, width 150ms, height 150ms;
}
</style>
