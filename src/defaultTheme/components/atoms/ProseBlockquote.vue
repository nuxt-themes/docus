<template>
  <blockquote>
    <slot />
  </blockquote>
</template>

<style lang="postcss" scoped>
blockquote {
  @apply text-lg;
  font-weight: 500;
  font-style: italic;
  color: #18181b;
  border-left-width: 0.25rem;
  border-left-color: #e4e4e7;
  quotes: '201C' '201D' '2018' '2019';
  margin-top: 1.6em;
  margin-bottom: 1.6em;
  padding-left: 1em;
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
