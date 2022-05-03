<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  iconClass: {
    type: String,
    default: '',
  },
})

const isImage = (icon: string) => String(icon).includes('.')
</script>

<template>
  <div class="flex">
    <div class="relative w-full p-8 bg-gray-100 dark:bg-gray-900 rounded-lg dark:bg-opacity-50">
      <img v-if="isImage(icon)" :src="icon" class="inline-block w-16 h-16 mb-3">

      <component :is="icon" v-else class="inline-block w-16 h-16 mb-4 text-6xl" />

      <slot />

      <div class="text-lg">
        <h3 class="font-semibold tracking-tight mb-4">
          {{ title }}
        </h3>

        <div class="font-medium text-primary">
          <slot name="description">
            <p v-if="description" class="inline font-medium tracking-tight">
              {{ description }}
            </p>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
