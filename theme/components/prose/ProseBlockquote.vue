<template>
  <blockquote>
    <slot />
  </blockquote>
</template>

<style lang="postcss" scoped>
blockquote {
  @apply text-base mt-[1.5em] mb-[1.5em] font-medium pl-4 text-secondary border-l-2 border-gray-200 dark:border-gray-700;

  quotes: '201C' '201D' '2018' '2019';
}

blockquote p:first-of-type::before {
  content: '';
}

blockquote p:last-of-type::after {
  content: '';
}
</style>
