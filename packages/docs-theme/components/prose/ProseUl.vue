<template>
  <ul>
    <slot />
  </ul>
</template>

<style lang="postcss" scoped>
ul {
  @apply mx-0 my-[1.25em] list-disc p-0 pl-6;

  :deep(ul),
  :deep(ol) {
    @apply !my-[0.5em];
  }
}
</style>
