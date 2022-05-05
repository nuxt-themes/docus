<script setup lang="ts">
import { ref, useDocus } from '#imports'

defineProps({
  toc: {
    type: Boolean,
    required: false,
    default: true,
  },
})

const { page } = useDocus()

const isOpen = ref(false)
</script>

<template>
  <Container padded class="relative flex flex-col-reverse gap-8 pb-4 sm:pb-6 lg:grid lg:grid-cols-12 lg:py-8">
    <!-- Aside -->
    <aside class="lg:top-header hidden overflow-y-auto overflow-x-hidden pb-8 lg:sticky lg:col-span-2 lg:-mt-8 lg:block lg:self-start lg:pb-0 lg:pt-8">
      <DocsAside />
    </aside>

    <!-- Page Body -->
    <div
      class="relative lg:mt-0"
      :class="{
        'min-height-without-toc lg:col-span-10': !toc,
        'min-height-with-toc lg:col-span-8': toc,
      }"
    >
      <slot />

      <DocsPageBottom v-if="page && toc" />

      <ProseHr v-if="page && toc" />

      <DocsPrevNext v-if="page && toc" />
    </div>

    <!-- TOC -->
    <div
      v-if="toc"
      :class="{
        'flex items-center lg:block': !isOpen,
      }"
      class="surface surface-blurry top-header sticky -mx-4 -mt-8 flex items-center overflow-x-hidden px-4 sm:-mx-6 sm:px-6 lg:col-span-2 lg:mx-0 lg:max-h-[calc(100vh-var(--layout-height))] lg:self-start lg:border-none lg:px-0 lg:pt-8"
    >
      <div>
        <button class="flex items-center gap-3 py-3 lg:hidden" @click="isOpen = !isOpen">
          <span class="font-semibold">Table of Contents</span>

          <Icon name="heroicons-outline:chevron-right" class="h-6 w-6 transform transition-transform duration-100" :class="[isOpen ? 'rotate-90' : 'rotate-0']" />
        </button>

        <DocsToc class="mt-2 mb-4 lg:mt-0" :class="[isOpen ? 'lg:block' : 'hidden lg:block']" @move="isOpen = false" />
      </div>
    </div>
  </Container>
</template>
