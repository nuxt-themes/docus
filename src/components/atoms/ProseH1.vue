<template>
  <h1><slot /></h1>
</template>

<style lang="postcss" scoped>
h1 {
  /* scroll-margin-block: var(--docs-scroll-margin-block); */
  color: theme('colors.gray.900');
  letter-spacing: theme('letterSpacing.tight');
  font-size: 2em;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  line-height: 1.3333333;
  font-weight: theme('fontWeight.bold');
}

h1 + * {
  margin-top: 0;
}

.dark h1 {
  color: theme('colors.gray.100');
}
</style>
