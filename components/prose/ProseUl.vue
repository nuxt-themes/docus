<template>
  <ul>
    <slot />
  </ul>
</template>

<style lang="ts" scoped>
css({
  ul: {
    fontFamily: '{typography.font.body}',
    listStyleType: '{prose.ul.listStyleType}',
    paddingInlineStart: '{prose.ul.paddingInlineStart}',
    margin: '{prose.ul.margin}',
    "& > :deep(li)": {
      "&::marker": {
        color: '{prose.ul.li.markerColor}',
      },
      'ul, ol': {
        margin: 0
      }
    }
  }
})
</style>
