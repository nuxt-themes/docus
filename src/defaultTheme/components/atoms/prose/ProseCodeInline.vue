<template>
  <code>
    <slot />
  </code>
</template>

<style lang="postcss" scoped>
code {
  @apply font-normal text-sm py-3px px-6px whitespace-nowrap rounded-md d-prose-code-inline-bg;
}

a code {
  @apply border border-dashed border-transparent;
  &:hover {
    @apply border-primary;
  }
}

tbody code {
  @apply text-[12px];
}

h1 a,
h2 a,
h3 a,
h4 a {
  &:hover {
    & code {
      @apply d-prose-code-inline-in-heading-border-hover; // 🥲
    }
  }
  code {
    @apply relative text-inherit;
  }
  & code:before {
    @apply absolute top-[-2px] left-[-2px] -z-1 d-prose-code-inline-bg rounded-md pointer-events-none;
    content: '';
    width: calc(100% + 4px);
    height: calc(100% + 4px);
  }
}
</style>
