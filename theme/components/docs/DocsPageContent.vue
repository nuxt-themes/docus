<script setup lang="ts">
import { ref } from '#imports'

defineProps({
  toc: {
    type: Boolean,
    required: false,
    default: true,
  },
})

const isOpen = ref(false)
</script>

<template>
  <div id="docus-docs-page-content" class="relative flex flex-col-reverse gap-8 lg:grid lg:grid-cols-12">
    <div
      class="mt-4 max-w-none lg:mt-0"
      :class="{
        'min-height-without-toc lg:col-span-12': !toc,
        'min-height-with-toc lg:col-span-9': toc,
      }"
    >
      <slot />
    </div>

    <div
      v-if="toc"
      :class="{
        'flex items-center lg:block': !isOpen,
      }"
      class="surface surface-blurry sticky top-16 -mx-4 -mt-8 flex items-center overflow-x-hidden border-b border-gray-200 px-4 dark:border-gray-800 sm:-mx-6 sm:px-6 lg:col-span-3 lg:mx-0 lg:max-h-[calc(100vh-var(--layout-height))] lg:self-start lg:border-none lg:px-0 lg:pt-8"
    >
      <div class="py-4 lg:py-0">
        <button class="flex items-center gap-3 lg:hidden" @click="isOpen = !isOpen">
          <span class="font-semibold">Table of Contents</span>

          <Icon name="heroicons-outline:chevron-right" class="h-6 w-6 transform transition-transform duration-100" :class="[isOpen ? 'rotate-90' : 'rotate-0']" />
        </button>

        <DocsToc class="mt-4 lg:mt-0" :class="[isOpen ? 'lg:block' : 'hidden lg:block']" @move="isOpen = false" />
      </div>
    </div>
  </div>
</template>
