<template>
  <p><slot /></p>
</template>

<style lang="ts" scoped>
css({
  p: {
    fontFamily: '{typography.font.body}',
    fontSize: '{prose.p.fontSize}',
    lineHeight: '{prose.p.lineHeight}',
    margin: '{prose.p.margin}',
    ':deep(br)': {
      display: "block",
      content: "''",
      margin: '{prose.p.br.margin}'
    }
  }
})
</style>
