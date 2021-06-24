<template>
  <h4><slot /></h4>
</template>

<style lang="postcss" scoped>
h4 {
  /* TODO */
  /* extend.fontSize do not work in Windi */
  font-size: 1.125rem;
  @apply tracking-tight leading-snug font-semibold mt-[1.25em] mb-[0.5em];
}

h4 + * {
  @apply mt-0;
}
</style>
