<script setup lang="ts">
defineProps({
  title: {
    type: String,
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
    <div class="relative w-full p-8 bg-gray-100 rounded-lg dark:bg-gray-900 dark:bg-opacity-50">
      <img v-if="isImage(icon)" :src="icon" class="inline-block w-16 h-16 mb-3" />

      <Icon :name="icon" v-else class="inline-block w-16 h-16 mb-4 text-6xl" />

      <slot />

      <div class="text-lg">
        <h3 v-if="title" class="mb-4 font-semibold tracking-tight">
          {{ title }}
        </h3>

        <div class="font-medium text-secondary">
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
