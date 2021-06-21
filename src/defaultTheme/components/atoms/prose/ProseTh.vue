<template>
  <th>
    <slot />
  </th>
</template>

<style lang="postcss" scoped>
thead th {
  @apply font-semibold d-secondary-text p-2 pt-0 align-bottom first:pl-0 last:pr-0;
}
</style>
