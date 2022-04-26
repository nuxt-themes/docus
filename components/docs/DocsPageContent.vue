<script setup lang="ts">
import { ref } from '#imports'

const isOpen = ref(false)
</script>

<template>
  <div class="flex flex-col-reverse lg:grid lg:grid-cols-10 gap-8 relative">
    <div
      class="col-span-10 lg:col-span-8"
    >
      <slot />
    </div>

    <div
      class="lg:col-span-2 lg:self-start overflow-x-hidden sticky top-16 -mx-4 sm:-mx-6 px-4 sm:px-6 lg:mx-0 lg:px-0 lg:pt-8 lg:-mt-8 backdrop-blur-md lg:max-h-[calc(100vh-64px)]"
    >
      <div class="py-4 lg:py-0">
        <button class="flex lg:hidden items-center gap-3" @click="isOpen = !isOpen">
          <span class="u-text-gray-900 font-semibold text-sm">Table of Contents</span>

          <Icon name="heroicons-outline:chevron-right" class="w-4 h-4 u-text-gray-400 transition-transform duration-100 transform" :class="[isOpen ? 'rotate-90' : 'rotate-0']" />
        </button>

        <DocsToc class="mt-4 lg:mt-0" :class="[isOpen ? 'lg:block' : 'hidden lg:block']" />
      </div>
    </div>
  </div>
</template>
