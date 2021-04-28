<template>
  <h2><slot /></h2>
</template>

<style lang="postcss" scoped>
h2 {
  /* TODO */
  font-size: 1.5rem;
  /* scroll-margin-block: var(--docs-scroll-margin-block); */
  color: theme('colors.gray.900');
  letter-spacing: theme('letterSpacing.tight');
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  line-height: theme('lineHeight.snug');
  font-weight: theme('fontWeight.bold');
}

h2 + * {
  margin-top: 0;
}

.dark h2 {
  color: theme('colors.gray.100');
}
</style>
