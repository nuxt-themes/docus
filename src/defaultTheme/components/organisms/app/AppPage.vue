<template>
  <div class="flex flex-col w-full pt-0 xl:flex-row xl:pt-10">
    <article class="flex-auto order-last min-w-0 mt-4 xl:order-first xl:mt-0">
      <slot />
      <div v-if="$scopedSlots['prev-next']" class="px-4 sm:px-6">
        <hr class="mt-10 mb-8 border-t d-border" />
        <slot name="prev-next" />
      </div>
    </article>

    <slot name="toc" />
  </div>
</template>
