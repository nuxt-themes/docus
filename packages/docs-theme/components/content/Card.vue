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
  /**
   * @values info, success, warning, danger
   */
  type: {
    type: String,
    default: 'base',
    validator(value: string) {
      return ['info', 'success', 'warning', 'danger', 'primary', 'base'].includes(value)
    },
  },
  blurry: {
    type: Boolean,
    default: true,
    required: false,
  },
})

const isImage = (icon: string) => String(icon).includes('.')
</script>

<template>
  <div class="flex">
    <div :class="[type, { blurry }]" class="card relative w-full p-8 rounded-xl">
      <img v-if="isImage(icon)" :src="icon" class="inline-block w-16 h-16 mb-3" />

      <Icon v-else :name="icon" class="inline-block w-16 h-16 mb-4 text-6xl" />

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
