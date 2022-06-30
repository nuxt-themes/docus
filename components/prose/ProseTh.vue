<template>
  <th>
    <slot />
  </th>
</template>

<style lang="postcss" scoped>
thead th {
  @apply u-text-gray-500 p-2 pt-0 align-bottom font-semibold first:pl-0 last:pr-0;
}
</style>
