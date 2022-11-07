<template>
  <p><slot /></p>
</template>

<style lang="postcss" scoped>
p {
  @apply my-4 leading-relaxed;

  :deep(br) {
    @apply mt-4 block;
    content: '';
  }
}
</style>
