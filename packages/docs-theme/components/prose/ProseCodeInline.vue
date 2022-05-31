<template>
  <code>
    <slot />
  </code>
</template>

<style lang="postcss" scoped>
code {
  @apply rounded-lg bg-gray-50 py-[3px] px-[6px] text-sm font-normal text-gray-800 dark:bg-gray-800 dark:text-gray-100;
  &.colored {
    @apply bg-gray-700 dark:bg-gray-800;
  }
}

tbody code {
  @apply text-sm;
}

a {
  code {
    @apply text-primary-500 border border-dashed border-transparent font-medium;

    &:hover {
      @apply border-gray-900 dark:border-white;
    }
  }
}

h1 a,
h2 a,
h3 a,
h4 a {
  code {
    @apply relative font-bold;
    font-size: inherit !important;
  }
}
</style>
