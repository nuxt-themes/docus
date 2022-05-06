<template>
  <ul>
    <slot />
  </ul>
</template>

<style lang="postcss" scoped>
ul {
  @apply mx-0 my-[1.25em] list-none p-0;
  :deep(ul),
  :deep(ol) {
    @apply !my-[0.5em];
  }
}
</style>
