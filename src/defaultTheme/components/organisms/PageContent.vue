<template>
  <div>
    <section
      class="mb-6"
      :class="{ 'border-b border-gray-100 dark:border-gray-800 dark:border-opacity-50 pb-6': page.description }"
    >
      <div class="flex items-center justify-between">
        <InjectComponent
          v-if="page.icon"
          :component="page.icon"
          class="inline-flex mr-3 w-16 h-16 justify-center items-center"
        >
          <span class="text-3rem">{{ page.icon }}</span>
        </InjectComponent>
        <h1 class="flex-1 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">{{ page.title }}</h1>
        <span
          v-if="page.draft"
          class="
            inline-block
            px-3
            py-1
            mr-2
            text-base
            font-medium
            leading-5
            tracking-tight
            text-yellow-500
            bg-yellow-100
            rounded-full
            items-flex
            dark:bg-yellow-800
            dark:text-yellow-400
          "
          >Draft</span
        >
        <Badge v-if="page.badge" class="font-medium">{{ page.badge }}</Badge>
      </div>
      <p v-if="page.description" class="mt-4 text-lg font-medium text-gray-600 dark:text-gray-300">
        {{ page.description }}
      </p>
    </section>
    <NuxtContent :document="page" class="docus-content" />
    <PageBottom :page="page" />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    page: {
      type: Object,
      required: true
    }
  }
})
</script>
