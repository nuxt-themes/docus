<template>
  <ol class="relative mb-16 space-y-2">
    <li class="relative grid-cols-5 gap-16 xl:grid">
      <div class="col-span-2 mb-6 xl:mb-0">
        <h4 class="mb-2 font-semibold leading-6 text-slate-900 dark:text-slate-200">
          <Markdown :use="$slots.title" unwrap="p" />
        </h4>
        <div>
          <Markdown :use="$slots.description" unwrap="p" />
        </div>
      </div>
      <div class="relative z-10 col-span-3">
        <Markdown :use="$slots.content" unwrap="p" />
      </div>
    </li>
  </ol>
</template>

<style scoped lang="postcss">
:deep(.prose-code) {
  @apply my-0 mt-0 !important;
}
</style>
