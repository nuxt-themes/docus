<script setup lang="ts">
defineProps({
  /**
   * @values info, success, warning, danger
   */
  type: {
    type: String,
    default: 'info',
    validator(value: string) {
      return ['info', 'success', 'warning', 'danger', 'primary'].includes(value)
    },
  },
})
</script>

<template>
  <div class="alert mt-4 mb-4 rounded-xl px-4 py-3 text-sm leading-relaxed" :class="[type]">
    <div class="flex items-start">
      <div class="alert-content flex-grow">
        <Markdown unwrap="p" />
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.alert {
  :deep() {
    strong {
      @apply font-semibold text-current;
    }

    a {
      @apply border-none font-semibold text-current underline;
      code {
        @apply border border-dashed border-transparent;
      }
    }

    .prose-code {
      @apply my-4;

      code {
        @apply bg-gray-50 dark:bg-gray-900;
      }
    }
  }
}

.alert :deep(p) {
  @apply m-0 !important;
}

.dark .alert {
  :deep() {
    a {
      @apply text-current;
    }
  }
}
</style>
