<template>
  <tr>
    <slot />
  </tr>
</template>

<style lang="postcss" scoped>
tbody tr {
  @apply border-b border-gray-100 dark:border-gray-800;
}
</style>
