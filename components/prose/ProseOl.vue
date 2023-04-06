<template>
  <ol>
    <slot />
  </ol>
</template>

<style lang="ts" scoped>
css({
  ol: {
    fontFamily: '{typography.font.body}',
    listStyleType: '{prose.ol.listStyleType}',
    paddingInlineStart: '{prose.ol.paddingInlineStart}',
    margin: '{prose.ol.margin}',
    "& > :deep(li)": {
      "&::marker": {
        color: '{prose.ol.li.markerColor}',
      },
      'ul, ol': {
        margin: 0
      }
    }
  }
})
</style>
