<template>
  <li><slot /></li>
</template>

<style lang="postcss" scoped>
li {
  @apply relative my-3 pl-2;
}

ul > li {
  &::marker {
    @apply u-text-gray-300;
  }
}

ol > li {
  &::marker {
    @apply u-text-gray-400;
  }
}

:deep(.nuxt-content-highlight) {
  @apply m-0;
}
</style>
