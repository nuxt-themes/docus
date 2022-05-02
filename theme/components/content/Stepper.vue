<template>
  <ol class="relative space-y-2 mb-16">
    <li class="relative xl:grid grid-cols-5 gap-16 ">
      <div class="mb-6 col-span-2 xl:mb-0">
        <h4 class="leading-6 text-slate-900 font-semibold mb-2 dark:text-slate-200">
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
  @apply mt-0 my-0 !important;
}
</style>
