<template>
  <div class="p-4 mt-4 mb-4 rounded-lg alert text-sm leading-relaxed" :class="[type]">
    <div class="flex items-center space-x-4">
      <div>
        <Component :is="`IconAlert${type}`" class="w-5 h-5" />
      </div>
      <div class="flex-grow alert-content">
        <Markdown unwrap="p" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { Markdown } from '~docus/utils'
export default defineComponent({
  components: { Markdown },
  props: {
    /**
     * @values info, success, warning, danger, next, star
     */
    type: {
      type: String,
      default: 'info',
      validator(value) {
        return ['info', 'success', 'warning', 'danger', 'next', 'star'].includes(value)
      }
    }
  }
})
</script>

<style lang="postcss" scoped>
.alert {
  &.success {
    @apply bg-green-50 dark:bg-green-800 dark:bg-opacity-25 text-green-600 dark:text-green-200;
    >>> {
      code {
        @apply bg-green-100 dark:bg-green-900 dark:bg-opacity-50 shadow-none text-current;
      }
      a:hover {
        code {
          @apply border-green-400 dark:border-green-700;
        }
      }
    }
  }
  &.info {
    @apply bg-blue-50 dark:bg-blue-800 dark:bg-opacity-25 text-blue-600 dark:text-blue-200;
    >>> {
      code {
        @apply bg-blue-100 dark:bg-blue-900 dark:bg-opacity-50 shadow-none text-current;
      }
      a:hover {
        code {
          @apply border-blue-400 dark:border-blue-700;
        }
      }
    }
  }
  &.next {
    @apply bg-gray-50 dark:bg-gray-800 dark:bg-opacity-25 text-gray-600 dark:text-gray-200;
    >>> {
      code {
        @apply bg-gray-100 dark:bg-gray-900 dark:bg-opacity-50 shadow-none text-current;
      }
      a:hover {
        code {
          @apply border-gray-400 dark:border-gray-700;
        }
      }
    }
  }
  &.star {
    @apply bg-purple-50 dark:bg-purple-800 dark:bg-opacity-25 text-purple-600 dark:text-purple-200;
    >>> {
      code {
        @apply bg-purple-100 dark:bg-purple-900 dark:bg-opacity-50 shadow-none text-current;
      }
      a:hover {
        code {
          @apply border-purple-400 dark:border-purple-700;
        }
      }
    }
  }
  &.warning {
    @apply bg-yellow-50 dark:bg-yellow-800 dark:bg-opacity-25 text-yellow-600 dark:text-yellow-100;
    >>> {
      code {
        @apply bg-yellow-100 dark:bg-yellow-900 dark:bg-opacity-50 shadow-none text-current;
      }
      a:hover {
        code {
          @apply border-yellow-400 dark:border-yellow-700;
        }
      }
    }
  }
  &.danger {
    @apply bg-red-50 dark:bg-red-800 dark:bg-opacity-25 text-red-600 dark:text-red-100;
    >>> {
      code {
        @apply bg-red-100 dark:bg-red-900 dark:bg-opacity-50 shadow-none text-current;
      }
      a:hover {
        code {
          @apply border-red-400 dark:border-red-700;
        }
      }
    }
  }
  >>> {
    strong {
      @apply font-semibold text-current;
    }
    a {
      @apply underline border-none font-semibold text-current;
      code {
        @apply border border-transparent border-dashed;
      }
    }
  }
}
.alert >>> p {
  @apply m-0 !important;
}
.dark .alert {
  >>> {
    a {
      @apply text-current;
    }
  }
}
</style>
