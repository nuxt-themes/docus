<template>
  <tr>
    <slot />
  </tr>
</template>

<style lang="postcss" scoped>
tbody tr {
  border-bottom-color: theme('colors.gray.200');
  border-bottom-width: 1px;
}

.dark tbody tr {
  border-bottom-color: theme('colors.gray.700');
}
</style>
