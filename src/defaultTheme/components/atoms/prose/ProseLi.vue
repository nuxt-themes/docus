<template>
  <li><slot /></li>
</template>

<style lang="postcss" scoped>
ul li {
  margin-top: 0.25em;
  margin-bottom: 0.25em;
  position: relative;
  padding-left: 1.75em;
  &::before {
    @apply d-secondary-bg;
    content: '';
    position: absolute;
    /* background-color: theme('colors.gray.300'); */
    border-radius: 50%;
    width: 0.375em;
    height: 0.375em;
    top: calc(0.875em - 0.1875em);
    left: 0.25em;
  }
  /* *:first-child {
      margin-top: 1.25em;
    } */
  /* *:last-child {
      margin-bottom: 0.5em;
    } */
  p {
    margin-top: 0.75em;
    margin-bottom: 0.75em;
  }
}

/* .dark ul li::before {
  background-color: theme('colors.gray.600');
} */

ol li {
  margin-top: 0.25em;
  margin-bottom: 0.25em;
  position: relative;
  padding-left: 1.75em;
  &::before {
    content: counter(list-item, decimal) '.';
    content: counter(list-item, var(--list-counter-style, decimal)) '.';
    position: absolute;
    font-weight: 500;
    color: theme('colors.gray.600');
    left: 0;
  }
  /* *:first-child {
      margin-top: 1.25em;
    } */
  /* *:last-child {
      margin-bottom: 0.5em;
    } */
  p {
    margin-top: 0.75em;
    margin-bottom: 0.75em;
  }
}

>>> .nuxt-content-highlight {
  margin: 0;
}

.dark ol li::before {
  color: theme('colors.gray.400');
}
</style>
