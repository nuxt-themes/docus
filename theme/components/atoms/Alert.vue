<template>
  <div class="p-4 mt-4 mb-4 border-l-4 alert" :class="`alert-${type}`">
    <div class="flex items-start">
      <div class="flex-shrink-0">
        <component :is="icon" class="w-6 h-6 mt-px alert-icon" />
      </div>
      <div class="flex-grow ml-2 overflow-auto alert-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'info',
      validator (value) {
        return ['info', 'success', 'warning', 'danger'].includes(value)
      }
    }
  },
  computed: {
    icon () {
      return ({
        info: 'IconInformationCircle',
        success: 'IconCheckCircle',
        warning: 'IconExclamationCircle',
        danger: 'IconXCircle'
      })[this.type]
    }
  }
}
</script>

<style>
.alert p {
  @apply m-0 !important;
}

.alert a {
  @apply text-gray-700 !important;
}
.dark .alert a {
  @apply text-gray-300 !important;
}

.alert strong {
  @apply text-current;
}

.alert-content pre code {
  background-color: inherit !important;
}

/* Info */

.alert-info {
  @apply bg-blue-100 dark:bg-blue-900 border-blue-400 dark:border-blue-600;
}
.alert-info code {
  @apply bg-blue-200 dark:bg-blue-800 shadow-none border-0 text-current;
}
.alert-info .alert-icon {
  @apply text-blue-400 dark:text-blue-300;
}
.alert-info .alert-content {
  @apply text-blue-700 dark:text-blue-300;
}

/* Success */

.alert-success {
  @apply bg-green-100 dark:bg-green-900 border-green-400 dark:border-green-600;
}
.alert-success code {
  @apply bg-green-200 dark:bg-green-800 shadow-none border-0 text-current;
}
.alert-success .alert-icon {
  @apply text-green-400 dark:text-green-300;
}
.alert-success .alert-content {
  @apply text-green-700 dark:text-green-300;
}

/* Warning */

.alert-warning {
  @apply bg-orange-100 dark:bg-orange-800 border-orange-400 dark:border-orange-600;
}
.alert-warning code {
  @apply bg-orange-200 dark:bg-orange-800 shadow-none border-0 text-current;
}
.alert-warning .alert-icon {
  @apply text-orange-400 dark:text-orange-300;
}
.alert-warning .alert-content {
  @apply text-orange-700 dark:text-orange-300;
}

/* Danger */

.alert-danger {
  @apply bg-red-100 dark:bg-red-900 border-red-400 dark:border-red-600;
}
.alert-danger code {
  @apply bg-red-200 dark:bg-red-800 shadow-none border-0 text-current;
}
.alert-danger .alert-icon {
  @apply text-red-400 dark:text-red-300;
}
.alert-danger .alert-content {
  @apply text-red-700 dark:text-red-300;
}
</style>
