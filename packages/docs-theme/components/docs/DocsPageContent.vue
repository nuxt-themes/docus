<script setup lang="ts">
import { computed, ref, useDocus } from '#imports'

const { page } = useDocus()

const toc = computed(() => {
  if (typeof page.value?.toc !== 'undefined') return page.value.toc
  return true
})

const aside = computed(() => {
  if (typeof page.value?.aside !== 'undefined') return page.value.aside
  return true
})

const isOpen = ref(false)
</script>

<template>
  <Container padded class="relative flex flex-col-reverse pb-4 sm:pb-6 lg:grid lg:grid-cols-12 lg:gap-8">
    <!-- Aside -->
    <aside v-if="aside" class="hidden pb-8 overflow-x-hidden overflow-y-auto lg:top-header lg:sticky lg:col-span-2 lg:-mt-8 lg:block lg:self-start lg:pb-0 lg:pt-8">
      <DocsAside />
    </aside>

    <!-- Page Body -->
    <div
      class="relative flex flex-col flex-1 lg:mt-0 lg:pt-8"
      :class="{
        'lg:flex lg:flex-1 lg:col-span-12': !aside && !toc,
        'lg:col-span-10 pt-8 lg:pt-8': !toc || !aside,
        'lg:col-span-8 pt-12': toc && aside,
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
      class="relative sticky flex items-center px-4 -mx-4 -mt-8 toc top-header sm:-mx-6 sm:px-6 lg:col-span-2 lg:mx-0 lg:max-h-page lg:self-start lg:bg-transparent lg:px-0 lg:pt-8 lg:backdrop-blur-none"
    >
      <div class="w-full cursor-pointer" @click="isOpen = !isOpen">
        <button class="flex items-center gap-1 py-3 lg:hidden">
          <span class="text-xs font-semibold">Table of Contents</span>
          <Icon name="heroicons-outline:chevron-right" class="w-4 h-4 transition-transform duration-100 transform" :class="[isOpen ? 'rotate-90' : 'rotate-0']" />
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
