<template>
  <div class="max-w-full my-6 overflow-x-auto">
    <table>
      <slot />
    </table>
  </div>
</template>

<style lang="postcss" scoped>
table {
  @apply leading-5 text-sm w-full table-auto text-left;
}
</style>
