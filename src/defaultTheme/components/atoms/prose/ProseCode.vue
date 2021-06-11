<template>
  <div class="docus-highlight group">
    <slot />
    <CopyButton class="copy-button opacity-0 transition-all duration-300" />
  </div>
</template>

<style lang="postcss" scoped>
pre {
  /* line-height: 1.7142857; */
  border-radius: theme('borderRadius.lg');
  padding: theme('padding.4');
  margin-top: 0px;
  margin-bottom: 0px;
  overflow-x: auto;
}
code {
  /* TODO */
  /* font-size: 0.875em; */
  @apply text-sm leading-relaxed;
  font-weight: 400;
  color: inherit;
  background-color: transparent !important;
  border-radius: theme('borderRadius.md');
}

pre code {
  background-color: transparent;
  font-family: theme('fontFamily.mono');
}

.dark {
  pre code {
    background-color: transparent;
    color: theme('colors.gray.100');
  }
}

.docus-highlight {
  @apply relative my-4;

  /* Style filename span added by @nuxt/content */
  & > .filename {
    @apply group-hover:opacity-0 transition-opacity duration-300 absolute top-0 right-0 z-0 m-1 py-1.5 px-2 bg-gray-100 dark:bg-gray-800 rounded-md font-mono font-medium text-xs leading-none tracking-tight text-gray-600 dark:text-gray-400;
  }
}

/* TODO: group-hover doesn't work */
.group:hover {
  .filename {
    @apply opacity-0;
  }
  .copy-button {
    @apply opacity-100;
  }
}
</style>
