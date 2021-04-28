<template>
  <hr />
</template>

<style lang="postcss" scoped>
hr {
  border-top: 1px solid theme('colors.gray.100');
  margin-top: theme('margin.8');
  margin-bottom: theme('margin.8');
}

hr + * {
  margin-top: 0;
}

.dark hr {
  border-color: theme('colors.gray.800');
}
</style>
