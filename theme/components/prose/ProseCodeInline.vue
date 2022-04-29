<template>
  <code>
    <slot />
  </code>
</template>

<style lang="postcss" scoped>
code {
  @apply font-normal text-sm py-[3px] px-[6px] rounded-lg bg-gray-100 text-gray-800 dark:text-gray-100 dark:bg-gray-800;
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
    @apply absolute top-[-2px] left-[-2px] -z-[1] rounded-lg pointer-events-none;
    content: '';
    width: calc(100% + 4px);
    height: calc(100% + 4px);
  }
}
</style>
