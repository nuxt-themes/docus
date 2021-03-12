<template>
  <div v-if="$docus.ui.slots" class="flex items-center justify-center px-6 py-6 font-mono text-sm font-semibold bg-gray-100 dark:bg-gray-800">
    <slot>Slot</slot>
  </div>
</template>
