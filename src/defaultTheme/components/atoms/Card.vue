<template>
  <div class="flex">
    <div
      class="relative w-full px-6 py-8 bg-white rounded border border-gray-200 dark:border-gray-700 dark:bg-gray-900"
    >
      <InjectComponent :component="icon" class="w-16 h-16 mb-3" :class="iconClass || ''">
        <img v-if="isImage(icon)" :src="icon" class="inline-block w-16 h-16 mb-3" />
        <span v-else class="inline-block w-16 h-16 mb-3 text-6xl">{{ icon }}</span>
      </InjectComponent>
      <h3 class="mb-2 text-xl">{{ title }}</h3>
      <slot />
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

<style scoped lang="postcss">
h2,
h3 {
  @apply mb-2 text-xl;
}
p {
  @apply font-normal;
}
</style>
