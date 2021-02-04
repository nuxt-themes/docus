<template>
  <a href="https://github.com/nuxtlabs/docus-starter/generate" target="_blank" rel="noopener" class="button-link"><slot /></a>
</template>

<style lang="postcss">
.prose a.button-link {
  @apply px-3 py-3 font-semibold text-white bg-green-600 rounded;
  &:hover {
    @apply border-none;
  }
}
</style>
