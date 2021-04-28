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
}
</style>
