<template>
  <blockquote>
    <slot />
  </blockquote>
</template>

<style lang="ts" scoped>
css({
  blockquote: {
    fontFamily: '{typography.font.body}',
    margin: '{prose.blockquote.margin}',
    paddingInlineStart: '{prose.blockquote.paddingInlineStart}',
    quotes: '{prose.blockquote.quotes}',
    color: '{prose.blockquote.color}',
    borderInlineStartWidth: '{prose.blockquote.border.width}',
    borderInlineStartStyle: '{prose.blockquote.border.style}',
    borderInlineStartColor: '{prose.blockquote.border.color}',
    "p:first-of-type::before": { content: "''" },
    "p:last-of-type::after": { content: "''" }
  },
})
</style>
