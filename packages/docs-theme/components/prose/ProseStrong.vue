<template>
  <strong>
    <slot />
  </strong>
</template>

<style lang="postcss" scoped>
strong {
  @apply font-semibold;
}
a strong {
  @apply text-current;
}
</style>
