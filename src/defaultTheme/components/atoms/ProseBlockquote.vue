<template>
  <blockquote>
    <slot />
  </blockquote>
</template>

<style lang="postcss" scoped>
blockquote {
  /* TODO */
  @apply text-lg;
  font-weight: 500;
  font-style: italic;
  color: theme('colors.gray.700');
  border-left-width: 0.25rem;
  border-left-color: theme('colors.gray.200');
  quotes: '201C' '201D' '2018' '2019';
  margin-top: 1.5em;
  margin-bottom: 1.5em;
  padding-left: 1rem;
}

blockquote p:first-of-type::before {
  content: '';
}
blockquote p:last-of-type::after {
  content: '';
}
.dark blockquote {
  color: theme('colors.gray.400');
  border-left-color: theme('colors.gray.700');
}
</style>
