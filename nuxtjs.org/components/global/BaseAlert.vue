<template>
  <div class="alert border-l-4 p-4 mb-4" :class="`alert-${type}`">
    <div class="flex">
      <div class="flex-shrink-0 self-start pt-1">
        <IconInfo v-if="type === 'info'" class="alert-icon" />
        <IconNext v-else-if="type === 'next'" class="alert-next" />
        <IconStar v-else-if="type === 'star'" class="alert-star" />
        <IconAlert v-else class="alert-icon" />
      </div>
      <div class="ml-2 alert-content text-sm">
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
      default: 'warning'
    }
  }
}
</script>

<style scoped>
.alert p {
  @apply m-0 !important;
}

/* Warning Icon */
.alert-warning {
  @apply bg-orange-100 border-orange-400;
}

.alert-warning code {
  @apply bg-orange-200 shadow-none;
}

.alert-warning .alert-icon {
  @apply text-orange-400;
}

.alert-warning .alert-content {
  @apply text-orange-700;
}

.dark-mode .alert-warning {
  @apply bg-yellow-900 border-yellow-700;
}

.dark-mode .alert-warning .alert-content {
  @apply text-orange-300 bg-yellow-900 border-yellow-700;
}

.dark-mode .alert-warning .alert-content code {
  @apply bg-yellow-800 !important;
}

/* Info Icon */
.alert-info {
  @apply bg-blue-100 border-blue-400;
}

.alert-info code {
  @apply bg-blue-200 shadow-none;
}

.alert-info .alert-icon {
  @apply text-blue-400;
}

.alert-info .alert-content {
  @apply text-blue-700;
}

.dark-mode .alert-info {
  @apply bg-blue-900 border-blue-700;
}

.dark-mode .alert-info .alert-content {
  @apply text-blue-300 bg-blue-900 border-blue-700;
}

.dark-mode .alert-info .alert-content code {
  @apply bg-blue-800 !important;
}

/* Next Icon */
.alert-next {
  @apply bg-gray-100 border-gray-400;
}

.alert-next code {
  @apply bg-gray-200 shadow-none;
}

.alert-next .alert-icon {
  @apply text-gray-400;
}

.alert-next .alert-content {
  @apply text-gray-700;
}

.dark-mode .alert-next {
  @apply bg-gray-800 border-gray-700;
}

.dark-mode .alert-next .alert-content {
  @apply text-gray-300 bg-gray-800 border-gray-700;
}

.dark-mode .alert-next .alert-content code {
  @apply bg-gray-800 !important;
}

/* Star Icon */
.alert-star {
  @apply bg-purple-100 border-purple-400;
}

.alert-star code {
  @apply bg-purple-200 shadow-none;
}

.alert-star .alert-icon {
  @apply text-purple-400;
}

.alert-star .alert-content {
  @apply text-purple-700;
}

.dark-mode .alert-star {
  @apply bg-purple-800 border-purple-700;
}

.dark-mode .alert-star .alert-content {
  @apply text-gray-300 bg-purple-800 border-purple-700;
}

.dark-mode .alert-star .alert-content code {
  @apply bg-purple-800 !important;
}
</style>
