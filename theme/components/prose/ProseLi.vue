<template>
  <li><slot /></li>
</template>

<style lang="postcss" scoped>
li {
  @apply relative my-[0.25em] pl-4;
  p {
    @apply my-[0.75em];
  }
}

ul > li {
  &::before {
    @apply absolute left-0 top-[0.5em] bg-primary-600 rounded-full w-1.5 h-1.5;
    content: '';
  }
}

ol > li {
  &::before {
    @apply absolute left-0 top-0 text-secondary;
    content: counter(list-item, decimal) '.';
    content: counter(list-item, var(--list-counter-style, decimal)) '.';
  }
}

:deep(.nuxt-content-highlight) {
  @apply m-0;
}
</style>
