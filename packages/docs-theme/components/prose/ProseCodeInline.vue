<template>
  <code>
    <slot />
  </code>
</template>

<style lang="postcss" scoped>
code {
  @apply rounded-lg py-[3px] px-[6px] text-sm font-normal dark:bg-gray-800 bg-gray-50 text-gray-800 dark:text-gray-100;
  &.colored {
    @apply dark:bg-gray-800 bg-gray-700;
  }
}

a code {
  &:hover {
    @apply border-primary-500;
  }
}

tbody code {
  @apply text-[12px];
}

h1 a,
h2 a,
h3 a,
h4 a {
  code {
    @apply relative;
    font-size: inherit !important;
  }
}
</style>
