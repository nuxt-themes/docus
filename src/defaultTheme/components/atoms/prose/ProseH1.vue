<template>
  <h1><slot /></h1>
</template>

<style lang="postcss" scoped>
h1 {
  /* TODO */
  /* extend.fontSize do not work in Windi */
  font-size: 2rem;
  @apply tracking-tight leading-snug font-semibold mt-[1em] mb-[0.5em];
}

h1 + * {
  @apply mt-0;
}
</style>
