<template>
  <thead>
    <slot />
  </thead>
</template>

<style lang="ts" scoped>
css({
  thead: {
    fontFamily: '{typography.font.display}',
    borderWidth: '{prose.thead.border.width}',
    borderStyle: '{prose.thead.border.style}',
    borderColor: '{prose.thead.border.color}',
    borderBottom: '{prose.thead.borderBottom.width}',
    borderBottomStyle: '{prose.thead.borderBottom.style}',
    borderBottomColor: '{prose.thead.borderBottom.color}',
  }
})
</style>
