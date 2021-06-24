<template>
  <h2><slot /></h2>
</template>

<style lang="postcss" scoped>
h2 {
  /* TODO */
  /* extend.fontSize do not work in Windi */
  font-size: 1.5rem;
  @apply tracking-tight leading-snug font-semibold mt-[1.25em] mb-[0.5em];
}

h2 + * {
  @apply mt-0;
}
</style>
