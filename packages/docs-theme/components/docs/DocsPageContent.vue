<script setup lang="ts">
import { computed, ref, useDocus } from '#imports'

const { page } = useDocus()

const toc = computed(() => {
  if (typeof page.value?.toc !== 'undefined') {
    return page.value.toc
  }
  return true
})

const aside = computed(() => {
  if (typeof page.value?.aside !== 'undefined') {
    return page.value.aside
  }
  return true
})

const isOpen = ref(false)
</script>

<template>
  <Container padded class="relative flex flex-col-reverse pb-4 sm:pb-6 lg:grid lg:grid-cols-12 lg:gap-8">
    <!-- Aside -->
    <aside v-if="aside" class="lg:top-header hidden overflow-y-auto overflow-x-hidden pb-8 lg:sticky lg:col-span-2 lg:-mt-8 lg:block lg:self-start lg:pb-0 lg:pt-8">
      <DocsAside />
    </aside>

    <!-- Page Body -->
    <div
      class="relative flex flex-1 flex-col lg:mt-0 lg:pt-8"
      :class="{
        'lg:col-span-12 lg:flex lg:flex-1': !aside && !toc,
        'pt-8 lg:col-span-10 lg:pt-8': !(toc || aside) && (toc || aside),
        'pt-12 lg:col-span-8': toc && aside,
      }"
    >
      <header id="header" class="relative">
        <div>
          <div class="flex items-center">
            <h1 class="inline-block text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              {{ page.title }}
            </h1>
          </div>
        </div>

        <p class="mt-2 text-lg text-gray-600 dark:text-gray-300">
          {{ page.description }}
        </p>
      </header>

      <hr class="my-8 border-gray-100 dark:border-gray-800" />

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
      class="toc top-header lg:max-h-page sticky -mx-4 -mt-8 flex items-center px-4 sm:-mx-6 sm:px-6 lg:col-span-2 lg:mx-0 lg:self-start lg:bg-transparent lg:px-0 lg:pt-8 lg:backdrop-blur-none"
    >
      <div class="w-full cursor-pointer sm:cursor-auto" @click="isOpen = !isOpen">
        <button class="flex items-center gap-1 py-3 lg:hidden">
          <span class="text-xs font-semibold">Table of Contents</span>
          <Icon name="heroicons-outline:chevron-right" class="h-4 w-4 transform transition-transform duration-100" :class="[isOpen ? 'rotate-90' : 'rotate-0']" />
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
    @apply absolute top-0 z-[-1] block h-full bg-white/95 backdrop-blur dark:bg-gray-900/95;
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
