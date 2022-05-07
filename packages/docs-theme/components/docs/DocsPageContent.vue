<script setup lang="ts">
import { computed, ref, useDocus } from '#imports'
const { page } = useDocus()
const toc = computed(() => {
  if (typeof page.value?.toc !== 'undefined') return page.value.toc
  return true
})
const isOpen = ref(false)
</script>

<template>
  <Container padded class="relative flex flex-col-reverse pb-4 sm:pb-6 lg:grid lg:grid-cols-12 lg:gap-8 lg:py-8">
    <!-- Aside -->
    <aside class="lg:top-header hidden overflow-y-auto overflow-x-hidden pb-8 lg:sticky lg:col-span-2 lg:-mt-8 lg:block lg:self-start lg:pb-0 lg:pt-8">
      <DocsAside />
    </aside>

    <!-- Page Body -->
    <div
      class="relative flex flex-1 flex-col lg:mt-0 lg:pt-0"
      :class="{
        'lg:col-span-10 lg:pt-0': !toc,
        'lg:col-span-8 pt-12': toc,
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
      class="surface-border border-b-2 lg:border-none border-b relative toc top-header sticky -mx-4 -mt-8 flex items-center px-4 sm:-mx-6 sm:px-6 lg:col-span-2 lg:mx-0 lg:max-h-[calc(100vh-var(--layout-height))] lg:self-start lg:border-none lg:bg-transparent lg:px-0 lg:pt-8 lg:backdrop-blur-none"
    >
      <div>
        <button class="flex items-center gap-3 py-3 lg:hidden" @click="isOpen = !isOpen">
          <span class="font-semibold">Table of Contents</span>

          <Icon name="heroicons-outline:chevron-right" class="h-6 w-6 transform transition-transform duration-100" :class="[isOpen ? 'rotate-90' : 'rotate-0']" />
        </button>

        <DocsToc class="mb-4 lg:mt-0" :class="[isOpen ? 'lg:block' : 'hidden lg:block']" @move="isOpen = false" />
      </div>
    </div>
  </Container>
</template>

<style lang="postcss" scoped>
.toc {
  &:before {
    content: ' ';
    width: 100%;
    right: 0;
    @apply block absolute z-[-1] top-0 surface surface-blurry h-full;
  }
}

@screen lg {
  .toc {
    &:before {
      display: none;
    }
  }
}
</style>
