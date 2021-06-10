<template>
  <th>
    <slot />
  </th>
</template>

<style lang="postcss" scoped>
/* TODO */
thead th {
  font-weight: theme('fontWeight.semibold');
  vertical-align: bottom;
  padding: 0 theme('padding.2') theme('padding.2');
  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    padding-right: 0;
  }
}
</style>
