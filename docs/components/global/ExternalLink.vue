<template>
  <a :href="href" target="_blank" rel="noopener" class="button-link"><slot /></a>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="postcss">
.prose a.button-link {
  @apply px-6 py-3 shadow-sm font-medium text-primary-500 dark:text-primary-400 bg-primary-100 dark:bg-primary-900 hover:bg-primary-200 dark:hover:bg-primary-800 rounded-md border-none;
}
</style>
