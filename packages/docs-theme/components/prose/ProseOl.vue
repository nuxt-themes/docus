<template>
  <ol>
    <slot />
  </ol>
</template>

<style lang="postcss" scoped>
ol {
  @apply mx-0 my-[1.25em] list-decimal p-0 pl-6;

  :deep(ul),
  :deep(ol) {
    @apply !my-[0.5em];
  }
}
</style>
