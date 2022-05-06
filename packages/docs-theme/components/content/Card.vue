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
    <div class="relative w-full rounded-lg bg-gray-100 p-8 dark:bg-gray-900 dark:bg-opacity-50">
      <img v-if="isImage(icon)" :src="icon" class="mb-3 inline-block h-16 w-16" />

      <component :is="icon" v-else class="mb-4 inline-block h-16 w-16 text-6xl" />

      <slot />

      <div class="text-lg">
        <h3 class="mb-4 font-semibold tracking-tight">
          {{ title }}
        </h3>

        <div class="text-primary font-medium">
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
