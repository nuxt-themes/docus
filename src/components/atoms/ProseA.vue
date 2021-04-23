<template>
  <a>
    <slot />
  </a>
</template>

<style lang="postcss" scoped>
:not(h2, h3) > a {
  color: var(--primary-500);
  font-weight: theme('fontWeight.medium');
  text-decoration: none;
  &:hover {
    border-bottom-width: 1px;
    border-bottom-color: var(--primary-500);
    padding-bottom: 1px;
  }
}

.dark :not(h2, h3) > a {
  color: var(--primary-400);
  &:hover {
    border-bottom-color: var(--primary-400);
  }
}
</style>
