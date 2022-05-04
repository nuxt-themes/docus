<script setup lang="ts">
import { nextTick, ref } from 'vue'
import type { PropType } from 'vue'

const props = defineProps({
  tabs: {
    type: Array as PropType<{ label: string }[]>,
    required: true,
  },
  activeTabIndex: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['update:activeTabIndex'])

const tabsRef = ref()

const highlightUnderline = ref()

function updateHighlightUnderlinePosition() {
  const activeTab = tabsRef.value[props.activeTabIndex]

  if (!activeTab) return

  highlightUnderline.value.style.left = `${activeTab.offsetLeft}px`
  highlightUnderline.value.style.top = `${activeTab.offsetTop}px`
  highlightUnderline.value.style.width = `${activeTab.clientWidth}px`
  highlightUnderline.value.style.height = `${activeTab.clientHeight}px`
}

function updateTabs(i) {
  emit('update:activeTabIndex', i)
  nextTick(() => updateHighlightUnderlinePosition())
}

onMounted(() => {
  setTimeout(() => {
    updateHighlightUnderlinePosition()
  }, 50)
})
</script>

<template>
  <div class="relative bg-gray-200 text-white dark:bg-gray-700">
    <div v-if="tabs" class="relative z-0 px-2">
      <button v-for="({ label }, i) in tabs" ref="tabsRef" :key="`${i}${label}`" class="xs:py-3 xs:my-0 relative my-2 rounded-lg px-2 py-1.5 font-mono text-sm tracking-tight focus:outline-none" :class="[activeTabIndex === i ? 'text-gray-800 dark:text-white' : 'text-gray-600 dark:text-gray-400']" @click="updateTabs(i)">
        {{ label }}
      </button>
      <span ref="highlightUnderline" class="highlight-underline xs:py-1.5 absolute -z-[1]">
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
