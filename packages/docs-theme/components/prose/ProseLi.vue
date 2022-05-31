<template>
  <li><slot /></li>
</template>

<style lang="postcss" scoped>
li {
  @apply relative my-3 pl-2;
}

ul > li {
  &::marker {
    @apply text-gray-200 dark:text-gray-600;
  }
}

ol > li {
  &::marker {
    @apply text-gray-400 dark:text-gray-300;
  }
}

:deep(.nuxt-content-highlight) {
  @apply m-0;
}
</style>
