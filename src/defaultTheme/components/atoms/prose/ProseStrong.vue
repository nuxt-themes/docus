<template>
  <strong>
    <slot />
  </strong>
</template>

<style lang="postcss" scoped>
strong {
  /* color: theme('colors.gray.900'); */
  font-weight: theme('fontWeight.semibold');
}
a strong {
  color: inherit;
}

.dark {
  /* strong {
    color: theme('colors.gray.100');
  } */
  a strong {
    color: inherit;
  }
}
</style>
