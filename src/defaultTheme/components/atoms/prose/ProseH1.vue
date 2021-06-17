<template>
  <h1><slot /></h1>
</template>

<style lang="postcss" scoped>
h1 {
  /* TODO */
  font-size: 2rem;
  /* scroll-margin-block: var(--docs-scroll-margin-block); */
  /* color: theme('colors.gray.900'); */
  letter-spacing: theme('letterSpacing.tight');
  margin-top: 1em;
  margin-bottom: 0.5em;
  line-height: theme('lineHeight.snug');
  font-weight: theme('fontWeight.semibold');
}

h1 + * {
  margin-top: 0;
}

.dark h1 {
  color: theme('colors.gray.100');
}
</style>
