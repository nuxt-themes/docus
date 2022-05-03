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
    @apply bg-primary-600 absolute left-0 top-[0.5em] h-1.5 w-1.5 rounded-full;
    content: '';
  }
}

ol > li {
  &::before {
    @apply text-secondary absolute left-0 top-0;
    content: counter(list-item, decimal) '.';
    content: counter(list-item, var(--list-counter-style, decimal)) '.';
  }
}

:deep(.nuxt-content-highlight) {
  @apply m-0;
}
</style>
