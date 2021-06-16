<template>
  <div>
    <section class="xl:mb-4 mt-4 xl:mt-0 px-4 sm:px-6">
      <div class="flex items-center justify-between">
        <InjectComponent
          v-if="page.icon"
          :component="page.icon"
          class="inline-flex mr-3 w-16 h-16 justify-center items-center"
        >
          <span class="text-3rem">{{ page.icon }}</span>
        </InjectComponent>
        <h1 class="flex-1 text-4xl font-semibold tracking-tight">
          {{ page.title }}
        </h1>
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
            dark:bg-yellow-800 dark:text-yellow-400
          "
          >Draft</span
        >
        <Badge v-if="page.badge" class="font-medium">{{ page.badge }}</Badge>
      </div>
      <p v-if="page.description" class="mt-4 text-lg font-medium d-secondary-text">
        {{ page.description }}
      </p>
      <hr v-if="$scopedSlots['mobile-toc'] || page.description" class="mt-4 d-border" />
    </section>

    <slot name="mobile-toc" />

    <div class="px-4 sm:px-6 mt-4">
      <NuxtContent :document="page" class="docus-content" />
    </div>
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
