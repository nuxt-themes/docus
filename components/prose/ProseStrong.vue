<template>
  <strong>
    <slot />
  </strong>
</template>

<style lang="ts" scoped>
css({
  strong: {
    fontFamily: '{typography.font.body}',
    fontWeight: '{prose.strong.fontWeight}'
  }
})
</style>
