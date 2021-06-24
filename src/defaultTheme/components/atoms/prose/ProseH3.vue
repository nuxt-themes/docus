<template>
  <h3><slot /></h3>
</template>

<style lang="postcss" scoped>
h3 {
  /* TODO */
  /* extend.fontSize do not work in Windi */
  font-size: 1.25rem;
  @apply tracking-tight leading-snug font-semibold mt-[1.25em] mb-[0.5em];
}

h3 + * {
  @apply mt-0;
}
</style>
