<template>
  <div class="docus-highlight">
    <slot />
    <CopyButton />
  </div>
</template>

<style lang="postcss" scoped>
pre {
  /* line-height: 1.7142857; */
  border-radius: theme('borderRadius.md');
  padding: theme('padding.4');
  margin-top: 0px;
  margin-bottom: 0px;
  overflow-x: auto;
}
code {
  /* TODO */
  /* font-size: 0.875em; */
  @apply text-xs leading-relaxed;
  font-weight: 400;
  color: inherit;
  background-color: theme('colors.gray.100');
  border-radius: theme('borderRadius.md');
}

pre code {
  background-color: transparent;
  font-family: theme('fontFamily.mono');
}

.dark {
  code {
    background-color: theme('colors.gray.800');
    border-radius: theme('borderRadius.md');
  }
  pre code {
    background-color: transparent;
    color: theme('colors.gray.100');
  }
}

.code-group .docus-highlight {
  & > .filename {
    @apply rounded-tr-none;
  }
}

.docus-highlight {
  @apply relative my-4;

  /* Style filename span added by @nuxt/content */
  & > .filename {
    @apply absolute top-0 right-0 z-0 py-1.5 px-2 bg-gray-200 dark:bg-gray-700 rounded-tr-md rounded-bl font-mono font-semibold text-xs leading-none tracking-tight text-gray-600 dark:text-gray-200;
  }
}
</style>
