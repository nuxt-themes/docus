<template>
  <code>
    <slot />
  </code>
</template>

<style lang="postcss" scoped>
code {
  @apply rounded-lg py-[3px] px-[6px] text-sm font-normal bg-gray-50 text-gray-700 dark:code-background dark:text-gray-100;
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
