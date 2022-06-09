<template>
  <code>
    <slot />
  </code>
</template>

<style lang="postcss" scoped>
code {
  @apply u-bg-gray-50 inline-flex overflow-hidden rounded-md py-[3px] px-[6px] text-sm font-normal text-gray-800 dark:text-gray-100;

  &.colored {
    @apply bg-gray-700 dark:bg-gray-800;
  }
}

tbody code {
  @apply text-sm;
}

a {
  @apply overflow-hidden;

  code {
    @apply text-primary-500 dark:text-primary-500 border border-dashed border-transparent font-medium;
  }
}

a:hover code {
  @apply border-primary-500 dark:border-primary-500;
}

h1 a,
h2 a,
h3 a,
h4 a {
  &:hover code {
    @apply border-gray-900 dark:border-white;
  }

  code {
    @apply relative px-2 py-1.5 font-bold u-text-gray-900;
    font-size: inherit !important;
  }
}
</style>
