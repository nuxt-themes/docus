<template>
  <ol>
    <slot />
  </ol>
</template>

<style lang="postcss" scoped>
/* TODO: move prose plugin sources */
ol[type='A'] {
  --list-counter-style: upper-alpha;
}
ol[type='a'] {
  --list-counter-style: lower-alpha;
}
ol[type='A s'] {
  --list-counter-style: upper-alpha;
}
ol[type='a s'] {
  --list-counter-style: lower-alpha;
}
ol[type='I'] {
  --list-counter-style: upper-roman;
}
ol[type='i'] {
  --list-counter-style: lower-roman;
}
ol[type='I s'] {
  --list-counter-style: upper-roman;
}
ol[type='i s'] {
  --list-counter-style: lower-roman;
}
ol[type='1'] {
  --list-counter-style: decimal;
}

ol {
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
}

>>> .nuxt-content-highlight {
  margin: 0;
}

.dark ol {
  & li::before {
    color: theme('colors.gray.400');
  }
}
</style>
