<template>
  <code>
    <slot />
  </code>
</template>

<style lang="postcss" scoped>
code {
  color: inherit;
  font-weight: 400;
  font-size: 0.875em;
  padding: 0.25rem;
  background-color: theme('colors.gray.100');
  border-radius: 0.375rem;
}

.dark code {
  font-weight: 400;
  color: inherit;
  background-color: theme('colors.gray.800');
  border-radius: 0.375rem;
}
</style>
