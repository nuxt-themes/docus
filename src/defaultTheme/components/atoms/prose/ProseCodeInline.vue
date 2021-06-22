<template>
  <code>
    <slot />
  </code>
</template>

<style lang="postcss" scoped>
code {
  /* TODO */
  /* font-size: 0.875em; */
  @apply text-sm whitespace-nowrap d-prose-code-inline-bg;
  color: inherit;
  font-weight: 400;
  padding: 0.2rem theme('padding.2');
  border-radius: theme('borderRadius.md');
}

a code {
  @apply border border-dashed border-transparent;
  &:hover {
    @apply border-primary;
  }
}

tbody code {
  /* TODO */
  font-size: 12px;
}

h1 a,
h2 a,
h3 a,
h4 a {
  &:hover {
    & code {
      border-color: theme('colors.gray.500');
    }
  }
  code {
    font-size: inherit;
    color: inherit;
    pointer-events: none;
    border: 1px dashed transparent;
    position: relative;
    z-index: 0;
  }
  & code:before {
    @apply d-prose-code-inline-bg rounded-md;
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    z-index: -1;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    /* background-color: theme('colors.white'); */
    pointer-events: none;
  }
}

.dark {
  code {
    color: inherit;
  }
  h1 a,
  h2 a,
  h3 a,
  h4 a {
    &:hover {
      code {
        border-color: theme('colors.gray.200');
      }
    }
    code:before {
      /* @apply bg-transparent; */
      /* background-color: theme('colors.gray.900'); */
    }
  }
}
</style>
