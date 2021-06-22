<template>
  <em>
    <slot />
  </em>
</template>

<style lang="postcss" scoped>
em {
  font-style: theme('fontStyle.italic');
}
a em {
  color: inherit;
}

.dark {
  a em {
    color: inherit;
  }
}
</style>
