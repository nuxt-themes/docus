<template>
  <div class="flex">
    <div class="relative w-full p-6 bg-gray-100 rounded-lg dark:bg-gray-800 dark:bg-opacity-50">
      <InjectComponent :component="icon" class="w-16 h-16 mb-3" :class="iconClass || ''">
        <NuxtImg v-if="isImage(icon)" :src="icon" class="inline-block w-16 h-16 mb-3" />
        <span v-else class="inline-block w-16 h-16 mb-3 text-6xl">{{ icon }}</span>
      </InjectComponent>
      <div class="text-lg xl:text-xl">
        <h3 class="mb-2 font-semibold inline mr-1">{{ title }}</h3>
        <div class="inline font-semibold text-gray-400 dark:text-gray-500">
          <slot name="description">
            <p v-if="description" class="inline font-semibold">{{ description }}</p>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    iconClass: {
      type: String,
      default: ''
    }
  },
  setup() {
    const isImage = icon => String(icon).includes('.')

    return {
      isImage
    }
  }
})
</script>
