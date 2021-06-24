<template>
  <div class="docus-highlight group">
    <slot />
    <CopyButton class="copy-button opacity-0 transition-all duration-300" />
  </div>
</template>

<style lang="postcss" scoped>
pre {
  @apply p-4 my-0 overflow-x-auto leading-normal d-prose-code-bg rounded-lg;
  code {
    @apply font-normal text-sm leading-relaxed;
  }
}

.docus-highlight {
  @apply relative my-4;

  /* Style filename span added by @nuxt/content */
  & > .filename {
    @apply group-hover:opacity-0 transition-opacity duration-300 absolute top-0 right-0 z-0 m-1 py-1.5 px-2 d-prose-code-filename-bg d-prose-code-filename-text rounded-md font-mono font-medium text-xs leading-none tracking-tight;
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
