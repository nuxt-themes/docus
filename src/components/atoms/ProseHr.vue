<template>
  <hr />
</template>

<style lang="postcss" scoped>
hr {
  border-top: 1px solid theme('colors.gray.100');
  margin-top: theme('spacing.8');
  margin-bottom: theme('spacing.8');
}

hr + * {
  margin-top: 0;
}

.dark hr {
  border-color: theme('colors.gray.800');
}
</style>
