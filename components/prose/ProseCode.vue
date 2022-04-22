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
    <span v-if="filename" class="filename transition-base top-1 right-1 opacity-100 absolute right-0 z-0 m-1 py-1.5 px-2 text-gray-400 bg-gray-900 rounded-md font-mono text-xs leading-none tracking-tight">
      {{ filename }}
    </span>

    <slot />

    <CopyButton class="copy-button opacity-0 transition-base" />
  </div>
</template>

<style lang="postcss" scoped>
div {
  @apply relative rounded-lg overflow-hidden my-4;
}

:deep(pre) {
  @apply flex flex-1 p-4 my-0 overflow-x-auto leading-normal;
  background-color: #282c34;
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
  .filename {
    @apply opacity-0;
  }

  .copy-button {
    @apply opacity-100;
  }
}
</style>
