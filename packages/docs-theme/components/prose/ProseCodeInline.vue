<template>
  <code>
    <slot />
  </code>
</template>

<style lang="postcss" scoped>
code {
  @apply rounded-lg bg-gray-100 py-[3px] px-[6px] text-sm font-normal text-gray-800 dark:bg-gray-800 dark:text-gray-100;

  &.colored {
    @apply code-background;
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
    font-size: inherit;
  }

  & code:before {
    @apply pointer-events-none absolute top-[-2px] left-[-2px] -z-[1] rounded-lg;
    content: '';
    width: calc(100% + 4px);
    height: calc(100% + 4px);
  }
}
</style>
