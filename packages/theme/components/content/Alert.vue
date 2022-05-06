<script setup lang="ts">
defineProps({
  /**
   * @values info, success, warning, danger
   */
  type: {
    type: String,
    default: 'info',
    validator(value: string) {
      return ['info', 'success', 'warning', 'danger'].includes(value)
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
  &.success {
    @apply border border-green-100 bg-green-50 text-green-600 dark:border-green-900 dark:bg-green-800 dark:bg-opacity-25 dark:text-green-200;

    :deep() {
      code {
        @apply border-green-200 bg-green-100 text-current shadow-none dark:border-green-800 dark:bg-green-900 dark:bg-opacity-50;
      }
      a:hover {
        code {
          @apply border-green-400 dark:border-green-700;
        }
      }
    }
  }

  &.info {
    @apply border border-blue-100 bg-blue-50 text-blue-600 dark:border-blue-900 dark:bg-blue-800 dark:bg-opacity-25 dark:text-blue-200;

    :deep() {
      code {
        @apply border-blue-200 bg-blue-100 text-current shadow-none dark:border-blue-800 dark:bg-blue-900 dark:bg-opacity-50;
      }
      a:hover {
        code {
          @apply border-blue-400 dark:border-blue-700;
        }
      }
    }
  }

  &.warning {
    @apply border border-yellow-100 bg-yellow-50 text-yellow-600 dark:border-yellow-900 dark:bg-yellow-800 dark:bg-opacity-25 dark:text-yellow-100;

    :deep() {
      code {
        @apply border-yellow-200 bg-yellow-100 text-current shadow-none dark:border-yellow-800 dark:bg-yellow-900 dark:bg-opacity-50;
      }
      a:hover {
        code {
          @apply border-yellow-400 dark:border-yellow-700;
        }
      }
    }
  }

  &.danger {
    @apply border border-red-100 bg-red-50 text-red-600 dark:border-red-900 dark:bg-red-800 dark:bg-opacity-25 dark:text-red-100;

    :deep() {
      code {
        @apply border-red-200 bg-red-100 text-current shadow-none dark:border-red-800 dark:bg-red-900 dark:bg-opacity-50;
      }
      a:hover {
        code {
          @apply border-red-400 dark:border-red-700;
        }
      }
    }
  }

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
