<script setup lang="ts">
import { computed, ref, useDocus } from '#imports'

const { page } = useDocus()

const toc = computed(
  () => {
    if (typeof page.value?.toc !== 'undefined')
      return page.value.toc

    return true
  },
)

const isOpen = ref(false)
</script>

<template>
  <div class="flex flex-col-reverse lg:grid lg:grid-cols-10 gap-8 relative">
    <div
      class="col-span-10 lg:col-span-8 mt-4 lg:mt-0"
      :class="{
        'lg:col-span-10': !toc,
        'lg:col-span-8': toc,
      }"
    >
      <slot />
    </div>

    <div
      v-if="toc"
      :class="{
        'flex items-center lg:block': !isOpen
      }"
      class="
        lg:col-span-2
        top-16
        flex items-center lg:self-start
        overflow-x-hidden
        surface surface-blurry
        sticky -mx-4 sm:-mx-6 px-4 sm:px-6 lg:mx-0 lg:px-0 lg:pt-8 -mt-8 lg:max-h-[calc(100vh-var(--header-height))]
        border-b
        lg:border-none
        border-gray-200
        dark:border-gray-800
      "
    >
      <div class="py-4 lg:py-0">
        <button class="flex lg:hidden items-center gap-3" @click="isOpen = !isOpen">
          <span class="font-semibold">Table of Contents</span>

          <Icon name="heroicons-outline:chevron-right" class="w-6 h-6 transition-transform duration-100 transform" :class="[isOpen ? 'rotate-90' : 'rotate-0']" />
        </button>

        <DocsToc class="mt-4 lg:mt-0" :class="[isOpen ? 'lg:block' : 'hidden lg:block']" @move="isOpen = false" />
      </div>
    </div>
  </div>
</template>
