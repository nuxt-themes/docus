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
  <div :class="[`highlight-${language}`]" class="prose-code group w-full text-gray-50">
    <span v-if="filename" class="filename absolute top-1 right-1 z-0 rounded-lg py-1 pr-2 font-mono text-xs leading-none tracking-tight text-gray-400 opacity-100">
      {{ filename }}
    </span>

    <slot />

    <CopyButton :content="code" class="copy-button absolute right-1 bottom-1 scale-0 opacity-0 transition" />
  </div>
</template>

<style lang="postcss" scoped>
div {
  @apply relative my-4 overflow-hidden rounded-lg;

  &.highlight-zsh,
  &.highlight-sh,
  &.highlight-bash,
  &.highlight-shell,
  &.highlight-shellscript {
    :deep(code) {
      .line {
        @apply relative pl-4;
      }

      .line::before {
        content: '>';
        @apply text-primary-500 absolute top-0 -left-[0.1rem] block select-none font-mono font-bold;
      }
    }
  }
}

:deep(pre) {
  @apply my-0 flex flex-1 overflow-x-auto bg-gray-900 p-4 leading-relaxed;
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
