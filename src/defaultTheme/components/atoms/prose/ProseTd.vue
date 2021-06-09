<template>
  <td>
    <slot />
  </td>
</template>

<style lang="postcss" scoped>
/* TODO */
tbody td {
  vertical-align: top;
  padding-top: 0.5714286em;
  padding-right: 0.5714286em;
  padding-bottom: 0.5714286em;
  padding-left: 0.5714286em;
  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    padding-right: 0;
  }
}
</style>
