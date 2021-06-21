<template>
  <blockquote>
    <slot />
  </blockquote>
</template>

<style lang="postcss" scoped>
blockquote {
  /* TODO */
  @apply text-base pl-4 d-secondary-text d-prose-blockquote-border;
  font-weight: 500;
  quotes: '201C' '201D' '2018' '2019';
  margin-top: 1.5em;
  margin-bottom: 1.5em;
}

blockquote p:first-of-type::before {
  content: '';
}
blockquote p:last-of-type::after {
  content: '';
}
</style>
