<template>
  <ul>
    <slot />
  </ul>
</template>

<style lang="postcss" scoped>
ul {
  margin-left: 0px;
  margin-right: 0px;
  padding: 0px;
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  list-style-type: none;

  ul,
  ol {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }

  li {
    margin-top: 0.25em;
    margin-bottom: 0.25em;
    position: relative;
    padding-left: 1.75em;
    &::before {
      content: '';
      position: absolute;
      background-color: theme('colors.gray.300');
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
}

.dark ul {
  & li::before {
    background-color: theme('colors.gray.600');
  }
}
</style>
