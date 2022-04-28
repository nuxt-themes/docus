<template>
  <ul>
    <slot />
  </ul>
</template>

<style lang="postcss" scoped>
ul {
  @apply list-none mx-0 p-0 my-[1.25em];
  :deep(ul),
  :deep(ol) {
    @apply !my-[0.5em];
  }
}
</style>
