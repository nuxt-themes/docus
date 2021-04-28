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
}
</style>
