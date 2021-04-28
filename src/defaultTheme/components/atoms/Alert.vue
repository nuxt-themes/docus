<template>
  <div class="p-4 mt-4 mb-4 rounded-md alert" :class="`alert-${type}`">
    <div class="flex items-start">
      <div class="flex-grow alert-content">
        <Markdown :node="$slots.default" unwrap="p" />
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
     * @values info, success, warning, danger
     */
    type: {
      type: String,
      default: 'info',
      validator(value) {
        return ['info', 'success', 'warning', 'danger'].includes(value)
      }
    }
  }
})
</script>

<style lang="postcss">
.alert p {
  @apply m-0 !important;
}

.alert .alert-content strong {
  @apply text-current;
}

.alert-content a {
  @apply text-current hover:border-current font-semibold;
}
.dark .alert-content a {
  @apply text-current hover:border-current font-semibold;
}

.alert-content pre code {
  background-color: inherit !important;
}

.dark .alert-content code {
  @apply text-current;
}

/* Info */

.alert-info {
  @apply bg-blue-100 dark:bg-blue-800 border-blue-400 dark:border-blue-600;
}
.alert-info code {
  @apply bg-blue-200 dark:bg-blue-700 shadow-none border-0 text-current;
}
.alert-info .alert-icon {
  @apply text-blue-400 dark:text-blue-300;
}
.alert-info .alert-content {
  @apply text-blue-700 dark:text-blue-300;
}

/* Success */

.alert-success {
  @apply bg-green-100 dark:bg-green-800 border-green-400 dark:border-green-600;
}
.alert-success code {
  @apply bg-green-200 dark:bg-green-700 shadow-none border-0 text-current;
}
.alert-success .alert-icon {
  @apply text-green-400 dark:text-green-300;
}
.alert-success .alert-content {
  @apply text-green-700 dark:text-green-300;
}

/* Warning */

.alert-warning {
  @apply bg-yellow-100 dark:bg-yellow-800 border-yellow-400 dark:border-yellow-600;
}
.alert-warning code {
  @apply bg-yellow-200 dark:bg-yellow-700 shadow-none border-0 text-current;
}
.alert-warning .alert-icon {
  @apply text-yellow-400 dark:text-yellow-300;
}
.alert-warning .alert-content {
  @apply text-yellow-700 dark:text-yellow-300;
}

/* Danger */

.alert-danger {
  @apply bg-red-100 dark:bg-red-800 border-red-400 dark:border-red-600;
}
.alert-danger code {
  @apply bg-red-200 dark:bg-red-700 shadow-none border-0 text-current;
}
.alert-danger .alert-icon {
  @apply text-red-400 dark:text-red-300;
}
.alert-danger .alert-content {
  @apply text-red-700 dark:text-red-300;
}
</style>
