<template>
  <a href="https://github.com/nuxtlabs/docus-starter/generate" target="_blank" rel="noopener" class="button-link"><slot /></a>
</template>

<style lang="postcss">
.prose a.button-link {
  @apply px-4 py-2.5 font-semibold text-lg text-primary-500 bg-transparent border-2 border-primary-500 hover:bg-primary-500 hover:text-white rounded-md;
}
</style>
