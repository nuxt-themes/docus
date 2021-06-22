<template>
  <h4><slot /></h4>
</template>

<style lang="postcss" scoped>
h4 {
  /* TODO */
  font-size: 1.125rem;
  /* scroll-margin-block: var(--docs-scroll-margin-block); */
  color: theme('colors.gray.900');
  letter-spacing: theme('letterSpacing.tight');
  margin-top: 1.25em;
  margin-bottom: 0.5em;
  line-height: theme('lineHeight.snug');
  font-weight: theme('fontWeight.semibold');
}

h4 + * {
  margin-top: 0;
}

.dark h4 {
  color: theme('colors.gray.100');
}
</style>
