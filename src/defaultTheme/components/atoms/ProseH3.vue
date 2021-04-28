<template>
  <h3><slot /></h3>
</template>

<style lang="postcss" scoped>
h3 {
  /* scroll-margin-block: var(--docs-scroll-margin-block); */
  color: theme('colors.gray.900');
  letter-spacing: theme('letterSpacing.tight');
  font-size: 1.25em;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  line-height: 1.3333333;
  font-weight: theme('fontWeight.semibold');
}

h3 + * {
  margin-top: 0;
}

.dark h3 {
  color: theme('colors.gray.100');
}
</style>
