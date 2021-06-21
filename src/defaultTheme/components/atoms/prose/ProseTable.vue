<template>
  <div class="max-w-full my-6 overflow-x-auto">
    <table>
      <slot />
    </table>
  </div>
</template>

<style lang="postcss" scoped>
table {
  /* TODO */
  @apply leading-5;
  font-size: 0.875rem;
  width: 100%;
  table-layout: auto;
  text-align: left;
}
</style>
