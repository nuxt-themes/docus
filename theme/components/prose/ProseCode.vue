<script setup lang="ts">
import type { PropType } from 'vue'
import type { Lang } from 'shiki-es'

defineProps({
  code: {
    type: String,
    default: '',
  },
  language: {
    type: String as PropType<Lang>,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
})
</script>

<template>
  <div class="prose-code group w-full text-gray-50">
    <span v-if="filename" class="filename transition-base absolute top-1 right-1 z-0 rounded-lg bg-gray-900 py-1.5 px-2 font-mono text-xs leading-none tracking-tight text-gray-400 opacity-100">
      {{ filename }}
    </span>

    <slot />

    <CopyButton :content="code" class="copy-button transition-base absolute right-1 bottom-1 scale-0 opacity-0" />
  </div>
</template>

<style lang="postcss" scoped>
div {
  @apply relative my-4 overflow-hidden rounded-lg;
}

:deep(pre) {
  @apply code-background my-0 flex flex-1 overflow-x-auto p-4 leading-relaxed;
}

:deep(code) {
  @apply flex flex-col;
}

:deep(.line) {
  @apply inline-table min-h-[1rem];
}

:deep(.line.highlight) {
  background-color: #3f3f46;
}

.group:hover {
  .copy-button {
    @apply scale-100 opacity-100;
  }
}
</style>
