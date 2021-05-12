<template>
  <section class="py-12 lg:py-24 bg-gray-50 dark:bg-gray-800">
    <div class="d-container-content">
      <h2 class="mb-8 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
        {{ title }}
      </h2>
      <ul
        class="grid gap-4 font-semibold text-left text-gray-900 dark:text-gray-100 sm:grid-cols-2 xl:grid-cols-3 2xl:gap-8"
      >
        <li v-for="(f, index) of features" :key="index" class="flex">
          <div
            class="relative w-full px-6 py-8 bg-white rounded border border-gray-200 dark:border-gray-700 dark:bg-gray-900"
          >
            <InjectComponent :component="f.icon" class="w-16 h-16 mb-3" :class="f.iconClass || ''">
              <NuxtImg
                v-if="isImage(f.icon)"
                :src="f.icon"
                width="64"
                height="64"
                class="inline-block w-16 h-16 mb-3"
              />
              <span v-else class="inline-block w-16 h-16 mb-3 text-6xl">{{ f.icon }}</span>
            </InjectComponent>
            <h2 class="mb-2 text-xl">{{ f.title }}</h2>
            <p class="font-normal">{{ f.description }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: 'Features'
    },
    features: {
      type: Array,
      default: () => [
        {
          icon: '👀',
          title: 'Use Emojis',
          description: 'And add a description for it!'
        },
        {
          icon: 'IconEdit',
          title: 'Use Components',
          description: 'By using a component name inside, great for using SVG.'
        }
      ]
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
