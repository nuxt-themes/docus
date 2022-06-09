<template>
  <blockquote>
    <slot />
  </blockquote>
</template>

<style lang="postcss" scoped>
blockquote {
  @apply u-text-gray-500 u-border-gray-200 mt-[1.5em] mb-[1.5em] border-l-2 pl-4 text-base font-medium;

  quotes: '201C' '201D' '2018' '2019';
}

blockquote p:first-of-type::before {
  content: '';
}

blockquote p:last-of-type::after {
  content: '';
}
</style>
