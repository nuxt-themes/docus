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
  <div class="prose-code w-full group">
    <slot />

    <CopyButton class="copy-button opacity-100 transition-all duration-300" />
  </div>
</template>

<style>
.prose {
  li {
    .prose-code {
      @apply my-4;
    }
  }
}
</style>

<style lang="postcss" scoped>
div {
  @apply flex text-gray-600 dark:text-gray-100 bg-gray-50 dark:bg-gray-900;
}

:deep(pre) {
  @apply py-4 flex flex-1;
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
</style>
