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
  @apply mx-0 p-0 my-[1.25em] list-none;
  ul,
  ol {
    @apply my-[0.5em];
  }
}
</style>
