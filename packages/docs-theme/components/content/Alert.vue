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
  <div class="px-4 py-3 mt-4 mb-4 text-sm leading-relaxed alert rounded-xl" :class="[type]">
    <div class="flex items-start">
      <div class="flex-grow alert-content">
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
        @apply bg-transparent;
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
