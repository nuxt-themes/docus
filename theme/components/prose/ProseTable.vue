<template>
  <div class="my-6 max-w-full overflow-x-auto">
    <table>
      <slot />
    </table>
  </div>
</template>

<style lang="postcss" scoped>
table {
  @apply w-full table-auto text-left text-sm leading-5;
}
</style>
