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
  color: inherit;
  font-weight: inherit;
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
    font-weight: inherit;
    pointer-events: none;
    border: 1px dashed transparent;
    position: relative;
    z-index: 0;
  }
  & code:before {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    z-index: -1;
    width: calc(100% + 8px);
    height: calc(100% + 8px);
    background-color: theme('colors.white');
    pointer-events: none;
  }
}

.dark {
  code {
    font-weight: inherit;
    color: inherit;
  }
  h1 a,
  h2 a,
  h3 a,
  h4 a {
    &:hover {
      code {
        border-color: theme('colors.gray.500');
      }
    }
    code:before {
      background-color: theme('colors.gray.900');
    }
  }
}
</style>
