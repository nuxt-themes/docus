<template>
<div class="max-w-full my-4 overflow-x-auto">
    <table>
    <slot />
  </table>
  </div>
  
</template>

<style lang="postcss" scoped>
table {
  width: 100%;
  table-layout: auto;
  text-align: left;
  margin-top: 2em;
  margin-bottom: 2em;
  font-size: 0.875rem;
  line-height: 1.25rem;
}
</style>
