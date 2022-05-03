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
  <div class="relative bg-gray-200 text-white dark:bg-gray-700">
    <div v-if="tabs" class="relative z-0 px-2">
      <button v-for="({ label }, i) in tabs" ref="tabs" :key="`${i}${label}`" class="xs:py-3 xs:my-0 relative my-1.5 px-3 py-1.5 font-mono text-sm font-bold tracking-tight focus:outline-none" :class="[activeTabIndex === i ? 'active text-gray-800 dark:text-white' : 'text-gray-600 dark:text-gray-400']" @click="$emit('update:activeTabIndex', i)">
        {{ label }}
      </button>
      <span ref="highlight-underline" class="highlight-underline xs:py-1.5 absolute -z-[1] h-full">
        <span class="flex h-full w-full rounded-lg bg-gray-300 dark:bg-gray-600" />
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
