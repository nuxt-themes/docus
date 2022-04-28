<template>
  <blockquote>
    <slot />
  </blockquote>
</template>

<style lang="postcss" scoped>
blockquote {
  @apply text-base mt-[1.5em] mb-[1.5em] font-medium pl-4 d-prose-blockquote-text d-prose-blockquote-border;

  quotes: '201C' '201D' '2018' '2019';
}

blockquote p:first-of-type::before {
  content: '';
}

blockquote p:last-of-type::after {
  content: '';
}
</style>
