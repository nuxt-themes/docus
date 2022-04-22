<template>
  <ol>
    <slot />
  </ol>
</template>

<style lang="postcss" scoped>
ol {
  @apply mx-0 p-0 my-[1.25em] list-none;

  :deep(ul),
  :deep(ol) {
    @apply !my-[0.5em];
  }
}
</style>
