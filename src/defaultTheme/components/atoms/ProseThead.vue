<template>
  <thead>
    <slot />
  </thead>
</template>

<style lang="postcss" scoped>
thead {
  font-weight: 600;
  border-bottom-width: 1px;
  color: theme('colors.gray.600');
  border-bottom-color: theme('colors.gray.200');
}

.dark thead {
  color: theme('colors.gray.100');
  border-bottom-color: theme('colors.gray.600');
}
</style>
