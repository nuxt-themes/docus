<template>
  <td>
    <slot />
  </td>
</template>

<style lang="postcss" scoped>
tbody td {
  @apply p-[0.5em] align-top first:pl-0 last:pr-0;
}
</style>
