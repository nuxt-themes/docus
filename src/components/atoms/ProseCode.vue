<template>
  <div class="nuxt-content-highlight">
    <slot />
    <CopyButton />
  </div>
</template>

<style lang="postcss" scoped>
code {
  font-weight: 400;
  font-size: 0.875em;
  color: inherit;
  background-color: theme('colors.gray.100');
  border-radius: theme('borderRadius.md');
}
pre {
  /* font-size: 0.875em; */
  line-height: 1.7142857;
  background-color: false;
  color: false;
  border-radius: theme('borderRadius.md');
  padding-top: theme('padding.3');
  padding-right: theme('padding.4');
  padding-bottom: theme('padding.3');
  padding-left: theme('padding.4');
  margin-top: 0px;
  margin-bottom: 0px;

  overflow-x: auto;
}
pre code {
  background-color: transparent;
  font-family: theme('fontFamily.mono');
}

.dark {
  code {
    background-color: theme('colors.gray.800');
    border-radius: theme('borderRadius.md');
  }
  pre code {
    background-color: transparent;
    color: theme('colors.gray.100');
  }
}
</style>
